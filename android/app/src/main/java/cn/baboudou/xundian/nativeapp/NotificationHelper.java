package cn.baboudou.xundian.nativeapp;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import me.leolin.shortcutbadger.ShortcutBadger;

public final class NotificationHelper {
    public static final String CHANNEL_ID = "xundian_tasks";

    private NotificationHelper() {}

    public static void createChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }
        NotificationManager manager =
            context.getSystemService(NotificationManager.class);
        NotificationChannel channel =
            new NotificationChannel(
                CHANNEL_ID,
                "巡店任务与整改提醒",
                NotificationManager.IMPORTANCE_HIGH
            );
        channel.setDescription("任务下发、整改反馈、审核结果和到期提醒");
        channel.enableVibration(true);
        channel.setShowBadge(true);
        manager.createNotificationChannel(channel);
    }

    public static void show(
        Context context,
        String title,
        String body,
        String notificationId
    ) {
        show(context, title, body, notificationId, 1);
    }

    public static void show(
        Context context,
        String title,
        String body,
        String notificationId,
        int badgeCount
    ) {
        createChannel(context);
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(
            Intent.FLAG_ACTIVITY_CLEAR_TOP
                | Intent.FLAG_ACTIVITY_SINGLE_TOP
        );
        PendingIntent contentIntent =
            PendingIntent.getActivity(
                context,
                requestCode(notificationId),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT
                    | PendingIntent.FLAG_IMMUTABLE
            );

        Notification.Builder builder =
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? new Notification.Builder(context, CHANNEL_ID)
                : new Notification.Builder(context);

        builder
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(new Notification.BigTextStyle().bigText(body))
            .setAutoCancel(true)
            .setContentIntent(contentIntent)
            .setGroup("xundian_cloud_messages")
            .setWhen(System.currentTimeMillis())
            .setNumber(Math.max(1, badgeCount))
            .setPriority(Notification.PRIORITY_HIGH)
            .setCategory(Notification.CATEGORY_REMINDER);

        NotificationManager manager =
            (NotificationManager) context.getSystemService(
                Context.NOTIFICATION_SERVICE
            );
        manager.notify(requestCode(notificationId), builder.build());
    }

    public static int requestCode(String id) {
        return Math.abs((id == null ? "xundian" : id).hashCode() % 100000);
    }

    public static void applyBadge(Context context, int count) {
        int value = Math.max(0, count);
        try {
            if (value > 0) {
                ShortcutBadger.applyCount(context, value);
            } else {
                ShortcutBadger.removeCount(context);
            }
        } catch (Exception ignored) {
            // Some Android-compatible launchers only support vendor broadcasts.
        }

        String packageName = context.getPackageName();
        String activityName = MainActivity.class.getName();
        sendBadgeBroadcast(
            context,
            "com.huawei.android.launcher.action.CHANGE_BADGE",
            packageName,
            activityName,
            value
        );
        sendBadgeBroadcast(
            context,
            "com.hihonor.android.launcher.action.CHANGE_BADGE",
            packageName,
            activityName,
            value
        );
    }

    private static void sendBadgeBroadcast(
        Context context,
        String action,
        String packageName,
        String activityName,
        int count
    ) {
        try {
            Intent intent = new Intent(action);
            intent.putExtra("package", packageName);
            intent.putExtra("class", activityName);
            intent.putExtra("badgenumber", count);
            intent.putExtra("badgecount", count);
            context.sendBroadcast(intent);
        } catch (Exception ignored) {
            // The active launcher may not register this vendor broadcast.
        }
    }
}
