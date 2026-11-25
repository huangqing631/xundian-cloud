package cn.baboudou.xundian.nativeapp;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import java.util.Map;

public final class ReminderScheduler {
    private static final String PREFS = "xundian_reminders";
    private static final String PREFIX = "reminder.";

    private ReminderScheduler() {}

    public static void schedule(
        Context context,
        String id,
        long triggerAtMillis,
        String title,
        String body
    ) {
        if (triggerAtMillis <= System.currentTimeMillis()) {
            return;
        }
        SharedPreferences prefs =
            context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        prefs
            .edit()
            .putLong(PREFIX + id + ".time", triggerAtMillis)
            .putString(PREFIX + id + ".title", title)
            .putString(PREFIX + id + ".body", body)
            .apply();

        AlarmManager manager =
            (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        manager.setAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            triggerAtMillis,
            pendingIntent(context, id, title, body)
        );
    }

    public static void cancel(Context context, String id) {
        SharedPreferences prefs =
            context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        prefs
            .edit()
            .remove(PREFIX + id + ".time")
            .remove(PREFIX + id + ".title")
            .remove(PREFIX + id + ".body")
            .apply();
        AlarmManager manager =
            (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        manager.cancel(pendingIntent(context, id, "", ""));
    }

    public static void rescheduleAll(Context context) {
        SharedPreferences prefs =
            context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        for (Map.Entry<String, ?> entry : prefs.getAll().entrySet()) {
            String key = entry.getKey();
            if (!key.startsWith(PREFIX) || !key.endsWith(".time")) {
                continue;
            }
            String id =
                key.substring(
                    PREFIX.length(),
                    key.length() - ".time".length()
                );
            long time = ((Number) entry.getValue()).longValue();
            String title = prefs.getString(PREFIX + id + ".title", "巡店提醒");
            String body = prefs.getString(PREFIX + id + ".body", "您有待办任务");
            schedule(context, id, time, title, body);
        }
    }

    private static PendingIntent pendingIntent(
        Context context,
        String id,
        String title,
        String body
    ) {
        Intent intent = new Intent(context, ReminderReceiver.class);
        intent.putExtra("title", title);
        intent.putExtra("body", body);
        intent.putExtra("id", id);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getBroadcast(
            context,
            NotificationHelper.requestCode(id),
            intent,
            flags
        );
    }
}
