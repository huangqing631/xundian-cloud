package cn.baboudou.xundian.nativeapp;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

public class CloudSyncWorker extends Worker {
    private static final String WORK_NAME = "xundian-cloud-notification-poll";
    private static final String PREFS = "xundian_cloud";

    public CloudSyncWorker(
        @NonNull Context context,
        @NonNull WorkerParameters workerParams
    ) {
        super(context, workerParams);
    }

    public static void configure(Context context) {
        Constraints constraints =
            new Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();
        PeriodicWorkRequest periodic =
            new PeriodicWorkRequest.Builder(
                CloudSyncWorker.class,
                15,
                TimeUnit.MINUTES
            )
                .setConstraints(constraints)
                .build();
        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            WORK_NAME,
            ExistingPeriodicWorkPolicy.UPDATE,
            periodic
        );
        OneTimeWorkRequest immediate =
            new OneTimeWorkRequest.Builder(CloudSyncWorker.class)
                .setConstraints(constraints)
                .build();
        WorkManager.getInstance(context).enqueue(immediate);
    }

    public static void clear(Context context) {
        WorkManager.getInstance(context).cancelUniqueWork(WORK_NAME);
    }

    @NonNull
    @Override
    public Result doWork() {
        Context context = getApplicationContext();
        android.content.SharedPreferences prefs =
            context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String apiBase = prefs.getString("apiBase", "");
        String token = prefs.getString("token", "");
        if (apiBase.isEmpty() || token.isEmpty()) return Result.success();

        HttpURLConnection connection = null;
        try {
            long since = prefs.getLong("lastNotificationAt", 0);
            URL url = new URL(
                apiBase +
                    "/notifications?since=" +
                    URLEncoder.encode(String.valueOf(since), "UTF-8")
            );
            connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(12000);
            connection.setReadTimeout(12000);
            connection.setRequestProperty(
                "Authorization",
                "Bearer " + token
            );
            connection.setRequestProperty("Accept", "application/json");
            if (connection.getResponseCode() == 401) {
                prefs.edit().remove("token").apply();
                return Result.success();
            }
            if (connection.getResponseCode() < 200
                || connection.getResponseCode() >= 300) {
                return Result.retry();
            }
            InputStream input = connection.getInputStream();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(input, StandardCharsets.UTF_8)
            );
            StringBuilder text = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                text.append(line);
            }
            reader.close();

            JSONObject result = new JSONObject(text.toString());
            JSONArray items = result.optJSONArray("items");
            long cursor = since;
            if (items != null) {
                int unreadCount = prefs.getInt("unreadBadgeCount", 0);
                for (int index = 0; index < items.length(); index += 1) {
                    JSONObject item = items.getJSONObject(index);
                    String title = item.optString("title", "巡店云提醒");
                    String body = item.optString(
                        "body",
                        "您有新的巡店消息"
                    );
                    String id =
                        "cloud-" +
                        item.optString("id", "message-" + index);
                    long createdAt = item.optLong("createdAt", 0);
                    unreadCount += 1;
                    NotificationHelper.show(
                        context,
                        title,
                        body,
                        id,
                        unreadCount
                    );
                    cursor = Math.max(cursor, createdAt);
                }
                prefs.edit()
                    .putInt("unreadBadgeCount", unreadCount)
                    .apply();
                NotificationHelper.applyBadge(context, unreadCount);
            }
            prefs.edit().putLong("lastNotificationAt", cursor).apply();
            return Result.success();
        } catch (Exception ignored) {
            return Result.retry();
        } finally {
            if (connection != null) connection.disconnect();
        }
    }
}
