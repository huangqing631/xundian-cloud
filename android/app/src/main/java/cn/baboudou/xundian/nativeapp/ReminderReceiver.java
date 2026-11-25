package cn.baboudou.xundian.nativeapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ReminderReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String title = intent.getStringExtra("title");
        String body = intent.getStringExtra("body");
        String id = intent.getStringExtra("id");
        NotificationHelper.show(
            context,
            title == null ? "巡店提醒" : title,
            body == null ? "您有待办任务" : body,
            id == null ? "reminder" : id
        );
    }
}
