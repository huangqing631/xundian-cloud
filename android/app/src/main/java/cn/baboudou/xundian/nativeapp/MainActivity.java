package cn.baboudou.xundian.nativeapp;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.ViewGroup;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;

public class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST = 4101;
    private static final int CAMERA_PERMISSION_REQUEST = 4102;
    private static final int NOTIFICATION_PERMISSION_REQUEST = 4103;

    private WebView webView;
    private ValueCallback<Uri[]> pendingFileCallback;
    private PermissionRequest pendingCameraRequest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NotificationHelper.createChannel(this);
        getWindow().setStatusBarColor(Color.parseColor("#F6F4EF"));
        getWindow().setNavigationBarColor(Color.parseColor("#F6F4EF"));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getWindow().getDecorView().setSystemUiVisibility(
                android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                    | android.view.View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
            );
        }

        webView = new WebView(this);
        webView.setLayoutParams(
            new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        );
        setContentView(webView);
        webView.addJavascriptInterface(new NativeBridge(), "XundianNative");

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setSupportMultipleWindows(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }
        final WebViewAssetLoader assetLoader =
            new WebViewAssetLoader.Builder()
                .addPathHandler(
                    "/assets/",
                    new WebViewAssetLoader.AssetsPathHandler(this)
                )
                .build();

        webView.setWebViewClient(
            new WebViewClient() {
                @Override
                public WebResourceResponse shouldInterceptRequest(
                    WebView view,
                    WebResourceRequest request
                ) {
                    return assetLoader.shouldInterceptRequest(request.getUrl());
                }

                @Override
                public boolean shouldOverrideUrlLoading(
                    WebView view,
                    WebResourceRequest request
                ) {
                    Uri uri = request.getUrl();
                    if ("appassets.androidplatform.net".equals(uri.getHost())) {
                        return false;
                    }
                    if ("https".equals(uri.getScheme())) {
                        try {
                            startActivity(new Intent(Intent.ACTION_VIEW, uri));
                        } catch (Exception ignored) {
                        }
                        return true;
                    }
                    return true;
                }
            }
        );

        webView.setWebChromeClient(
            new WebChromeClient() {
                @Override
                public void onPermissionRequest(final PermissionRequest request) {
                    runOnUiThread(
                        () -> handleWebPermissionRequest(request)
                    );
                }

                @Override
                public boolean onShowFileChooser(
                    WebView webView,
                    ValueCallback<Uri[]> filePathCallback,
                    FileChooserParams fileChooserParams
                ) {
                    if (pendingFileCallback != null) {
                        pendingFileCallback.onReceiveValue(null);
                    }
                    pendingFileCallback = filePathCallback;
                    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("image/*");
                    intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                    try {
                        startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                    } catch (Exception error) {
                        pendingFileCallback = null;
                        Toast.makeText(
                            MainActivity.this,
                            "无法打开图片选择器",
                            Toast.LENGTH_SHORT
                        ).show();
                        return false;
                    }
                    return true;
                }
            }
        );

        webView.loadUrl(
            "https://appassets.androidplatform.net/assets/www/index.html?native=1"
        );
        requestNotificationPermission();
    }

    private void requestNotificationPermission() {
        if (
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(
                new String[] { Manifest.permission.POST_NOTIFICATIONS },
                NOTIFICATION_PERMISSION_REQUEST
            );
        }
    }

    private final class NativeBridge {
        @JavascriptInterface
        public boolean isNativeApp() {
            return true;
        }

        @JavascriptInterface
        public String getAppVersion() {
            try {
                return getPackageManager()
                    .getPackageInfo(getPackageName(), 0)
                    .versionName;
            } catch (PackageManager.NameNotFoundException ignored) {
                return "";
            }
        }

        @JavascriptInterface
        public void requestNotifications() {
            runOnUiThread(MainActivity.this::requestNotificationPermission);
        }

        @JavascriptInterface
        public void notifyMessage(String title, String body, String id) {
            NotificationHelper.show(
                MainActivity.this,
                title == null ? "巡店云提醒" : title,
                body == null ? "您有新的运营消息" : body,
                id == null ? "message" : id
            );
        }

        @JavascriptInterface
        public void scheduleReminder(
            double timestamp,
            String title,
            String body,
            String id
        ) {
            ReminderScheduler.schedule(
                MainActivity.this,
                id == null ? "reminder" : id,
                (long) timestamp,
                title == null ? "巡店提醒" : title,
                body == null ? "您有待办任务" : body
            );
        }

        @JavascriptInterface
        public void cancelReminder(String id) {
            ReminderScheduler.cancel(
                MainActivity.this,
                id == null ? "reminder" : id
            );
        }
    }

    private void handleWebPermissionRequest(PermissionRequest request) {
        boolean requestsCamera = false;
        for (String resource : request.getResources()) {
            if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)) {
                requestsCamera = true;
                break;
            }
        }
        if (!requestsCamera) {
            request.deny();
            return;
        }
        if (checkSelfPermission(Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_GRANTED) {
            request.grant(new String[] { PermissionRequest.RESOURCE_VIDEO_CAPTURE });
            return;
        }
        pendingCameraRequest = request;
        requestPermissions(
            new String[] { Manifest.permission.CAMERA },
            CAMERA_PERMISSION_REQUEST
        );
    }

    @Override
    public void onRequestPermissionsResult(
        int requestCode,
        String[] permissions,
        int[] grantResults
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != CAMERA_PERMISSION_REQUEST || pendingCameraRequest == null) {
            if (
                requestCode == NOTIFICATION_PERMISSION_REQUEST
                    && grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED
            ) {
                Toast.makeText(this, "消息提醒已开启", Toast.LENGTH_SHORT).show();
            }
            return;
        }
        if (
            grantResults.length > 0
                && grantResults[0] == PackageManager.PERMISSION_GRANTED
        ) {
            pendingCameraRequest.grant(
                new String[] { PermissionRequest.RESOURCE_VIDEO_CAPTURE }
            );
        } else {
            pendingCameraRequest.deny();
            Toast.makeText(
                this,
                "需要相机权限才能拍摄巡店照片，请在系统设置中开启",
                Toast.LENGTH_LONG
            ).show();
        }
        pendingCameraRequest = null;
    }

    @Override
    protected void onActivityResult(
        int requestCode,
        int resultCode,
        Intent data
    ) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST || pendingFileCallback == null) {
            return;
        }
        Uri[] results = null;
        if (resultCode == RESULT_OK && data != null) {
            if (data.getClipData() != null) {
                int count = data.getClipData().getItemCount();
                results = new Uri[count];
                for (int index = 0; index < count; index += 1) {
                    results[index] = data.getClipData().getItemAt(index).getUri();
                }
            } else if (data.getData() != null) {
                results = new Uri[] { data.getData() };
            }
        }
        pendingFileCallback.onReceiveValue(results);
        pendingFileCallback = null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (pendingCameraRequest != null) {
            pendingCameraRequest.deny();
        }
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
