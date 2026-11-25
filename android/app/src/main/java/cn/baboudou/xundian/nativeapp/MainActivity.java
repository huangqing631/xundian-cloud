package cn.baboudou.xundian.nativeapp;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
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

import androidx.core.content.FileProvider;
import androidx.webkit.WebViewAssetLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import me.leolin.shortcutbadger.ShortcutBadger;

public class MainActivity extends Activity {
    private static final String CLOUD_APP_HOST =
        "inadequate-guppy-d1ebsc184b2357e-1541377786.ap-shanghai.app.tcloudbase.com";
    private static final String CLOUD_APP_URL =
        "https://" + CLOUD_APP_HOST + "/web/index.html?native=1";
    private static final String LOCAL_APP_URL =
        "https://appassets.androidplatform.net/assets/www/index.html?native=1";
    private static final int FILE_CHOOSER_REQUEST = 4101;
    private static final int CAMERA_PERMISSION_REQUEST = 4102;
    private static final int NOTIFICATION_PERMISSION_REQUEST = 4103;

    private WebView webView;
    private ValueCallback<Uri[]> pendingFileCallback;
    private PermissionRequest pendingCameraRequest;
    private long lastRootBackAt = 0;
    private final ExecutorService updateExecutor = Executors.newSingleThreadExecutor();
    private volatile boolean updateDownloadInFlight = false;
    private String pendingUpdateUrl = "";
    private String pendingUpdateVersion = "";

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
                    if (
                        "appassets.androidplatform.net".equals(uri.getHost()) ||
                        CLOUD_APP_HOST.equals(uri.getHost())
                    ) {
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

                @Override
                public void onReceivedError(
                    WebView view,
                    WebResourceRequest request,
                    android.webkit.WebResourceError error
                ) {
                    if (request.isForMainFrame()) {
                        Toast.makeText(
                            MainActivity.this,
                            "网络不可用，已进入离线模式",
                            Toast.LENGTH_SHORT
                        ).show();
                        view.loadUrl(LOCAL_APP_URL);
                    }
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

        webView.loadUrl(CLOUD_APP_URL);
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
        public void setCloudSession(String apiBase, String token) {
            if (apiBase == null || token == null || apiBase.isEmpty()) return;
            android.content.SharedPreferences prefs =
                getSharedPreferences("xundian_cloud", MODE_PRIVATE);
            android.content.SharedPreferences.Editor editor = prefs
                .edit()
                .putString("apiBase", apiBase)
                .putString("token", token);
            if (!prefs.contains("lastNotificationAt")) {
                editor.putLong(
                    "lastNotificationAt",
                    System.currentTimeMillis()
                );
            }
            editor.apply();
            CloudSyncWorker.configure(MainActivity.this);
        }

        @JavascriptInterface
        public void clearCloudSession() {
            getSharedPreferences("xundian_cloud", MODE_PRIVATE)
                .edit()
                .remove("apiBase")
                .remove("token")
                .remove("lastNotificationAt")
                .apply();
            CloudSyncWorker.clear(MainActivity.this);
        }

        @JavascriptInterface
        public void setBadgeCount(int count) {
            getSharedPreferences("xundian_cloud", MODE_PRIVATE)
                .edit()
                .putInt("unreadBadgeCount", Math.max(0, count))
                .apply();
            try {
                if (count > 0) ShortcutBadger.applyCount(MainActivity.this, count);
                else ShortcutBadger.removeCount(MainActivity.this);
            } catch (Exception ignored) {
                // Some launchers do not support numeric application badges.
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
        public void downloadAndInstallUpdate(String url, String version) {
            if (!isTrustedUpdateUrl(url)) {
                runOnUiThread(
                    () -> Toast.makeText(
                        MainActivity.this,
                        "更新地址校验失败，请联系管理员",
                        Toast.LENGTH_LONG
                    ).show()
                );
                return;
            }
            pendingUpdateUrl = url;
            pendingUpdateVersion = version == null ? "" : version;
            runOnUiThread(() -> beginNativeUpdateDownload());
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

    private boolean isTrustedUpdateUrl(String value) {
        if (value == null || value.isEmpty()) return false;
        Uri uri = Uri.parse(value);
        if (!"https".equals(uri.getScheme())) return false;
        String host = uri.getHost();
        return CLOUD_APP_HOST.equals(host)
            || "huangqing631.github.io".equals(host);
    }

    private void beginNativeUpdateDownload() {
        if (pendingUpdateUrl.isEmpty() || updateDownloadInFlight) return;
        if (
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && !getPackageManager().canRequestPackageInstalls()
        ) {
            Toast.makeText(
                this,
                "请允许巡店云安装更新，返回后会自动继续下载",
                Toast.LENGTH_LONG
            ).show();
            try {
                Intent settingsIntent = new Intent(
                    Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:" + getPackageName())
                );
                startActivity(settingsIntent);
            } catch (Exception ignored) {
                Toast.makeText(
                    this,
                    "请到系统设置中允许安装未知来源应用",
                    Toast.LENGTH_LONG
                ).show();
            }
            return;
        }
        downloadUpdatePackage(pendingUpdateUrl, pendingUpdateVersion);
    }

    private void downloadUpdatePackage(String urlValue, String version) {
        updateDownloadInFlight = true;
        Toast.makeText(
            this,
            "正在后台下载最新版本，完成后会弹出安装确认",
            Toast.LENGTH_LONG
        ).show();
        updateExecutor.execute(() -> {
            File partialFile = null;
            try {
                File downloadRoot = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                if (downloadRoot == null) downloadRoot = getCacheDir();
                if (!downloadRoot.exists() && !downloadRoot.mkdirs()) {
                    throw new IllegalStateException("无法创建更新目录");
                }
                String safeVersion = version.replaceAll("[^0-9A-Za-z._-]", "");
                String fileName = "xundian-cloud-"
                    + (safeVersion.isEmpty() ? String.valueOf(System.currentTimeMillis()) : safeVersion)
                    + ".apk";
                File targetFile = new File(downloadRoot, fileName);
                partialFile = new File(downloadRoot, fileName + ".part");
                if (partialFile.exists() && !partialFile.delete()) {
                    throw new IllegalStateException("无法清理旧下载文件");
                }

                HttpURLConnection connection =
                    (HttpURLConnection) new URL(urlValue).openConnection();
                connection.setConnectTimeout(20000);
                connection.setReadTimeout(120000);
                connection.setInstanceFollowRedirects(true);
                connection.setRequestProperty("Cache-Control", "no-cache");
                connection.connect();
                int statusCode = connection.getResponseCode();
                if (statusCode < 200 || statusCode >= 300) {
                    throw new IllegalStateException("更新下载失败 (" + statusCode + ")");
                }
                InputStream input = connection.getInputStream();
                FileOutputStream output = new FileOutputStream(partialFile);
                try {
                    byte[] buffer = new byte[64 * 1024];
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        output.write(buffer, 0, count);
                    }
                    output.flush();
                } finally {
                    output.close();
                    input.close();
                    connection.disconnect();
                }
                if (partialFile.length() < 1024) {
                    throw new IllegalStateException("下载的安装包不完整");
                }
                if (targetFile.exists() && !targetFile.delete()) {
                    throw new IllegalStateException("无法替换旧安装包");
                }
                if (!partialFile.renameTo(targetFile)) {
                    throw new IllegalStateException("无法保存安装包");
                }
                partialFile = null;
                File completedFile = targetFile;
                runOnUiThread(() -> launchPackageInstaller(completedFile));
            } catch (Exception error) {
                if (partialFile != null && partialFile.exists()) {
                    partialFile.delete();
                }
                String message = error.getMessage();
                runOnUiThread(
                    () -> Toast.makeText(
                        MainActivity.this,
                        message == null || message.isEmpty()
                            ? "更新下载失败，请稍后重试"
                            : message,
                        Toast.LENGTH_LONG
                    ).show()
                );
            } finally {
                updateDownloadInFlight = false;
            }
        });
    }

    private void launchPackageInstaller(File packageFile) {
        try {
            Uri packageUri = FileProvider.getUriForFile(
                this,
                getPackageName() + ".fileprovider",
                packageFile
            );
            Intent installIntent = new Intent(Intent.ACTION_VIEW)
                .setDataAndType(
                    packageUri,
                    "application/vnd.android.package-archive"
                )
                .addFlags(
                    Intent.FLAG_GRANT_READ_URI_PERMISSION
                        | Intent.FLAG_ACTIVITY_NEW_TASK
                );
            startActivity(installIntent);
        } catch (Exception error) {
            Toast.makeText(
                this,
                "无法打开系统安装程序，请稍后重试",
                Toast.LENGTH_LONG
            ).show();
        }
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
    protected void onResume() {
        super.onResume();
        if (
            !pendingUpdateUrl.isEmpty()
                && !updateDownloadInFlight
                && (
                    Build.VERSION.SDK_INT < Build.VERSION_CODES.O
                        || getPackageManager().canRequestPackageInstalls()
                )
        ) {
            runOnUiThread(this::beginNativeUpdateDownload);
        }
    }

    @Override
    public void onBackPressed() {
        if (webView == null) {
            super.onBackPressed();
            return;
        }
        webView.evaluateJavascript(
            "window.XundianBack ? window.XundianBack() : false",
            value -> {
                if ("true".equals(value)) return;
                if (webView.canGoBack()) {
                    webView.goBack();
                    return;
                }
                long now = System.currentTimeMillis();
                if (now - lastRootBackAt <= 2000) {
                    finish();
                    return;
                }
                lastRootBackAt = now;
                Toast.makeText(
                    MainActivity.this,
                    "再返回一次退出应用",
                    Toast.LENGTH_SHORT
                ).show();
            }
        );
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
        updateExecutor.shutdownNow();
        super.onDestroy();
    }
}
