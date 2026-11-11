PlanNote v0.4 — Google同期の確認・バックアップ強化版

【重要】Googleカレンダーとの実接続・同期は未検証です。まずテスト用Googleアカウントで確認してください。
Google同期は現在メインカレンダーのみ対応。終日予定、削除同期、繰り返しの例外、タスク・習慣の端末間同期は未対応です。
AI入力はルールベース、通知はアプリを開いている間のみです。

【GitHub Pagesで公開】
1. https://github.com/new でPublicリポジトリを作る（例: plannote）。
2. このZIPを解凍して、index.html / manifest.webmanifest / sw.js / icon-192.png / icon-512.png / .nojekyll をリポジトリのルートへアップロード。
3. Settings → Pages → Build and deployment → Deploy from a branch、main、/(root) を選び Save。
4. 公開URL https://ユーザー名.github.io/plannote/ にアクセスする。反映には少し時間がかかる場合があります。
5. Android Chromeならメニューから「アプリをインストール」または「ホーム画面に追加」。

【Google Cloudの設定】
1. https://console.cloud.google.com/ でプロジェクトを作成。
2. Google Calendar APIを有効化。
3. Google Auth Platformのブランド設定、対象ユーザー設定、必要に応じてテストユーザーを登録。
4. OAuthクライアントを「ウェブアプリケーション」で作成。
5. 承認済みJavaScript生成元に https://ユーザー名.github.io を登録（末尾パスなし）。
6. アプリの「設定」にOAuthクライアントIDを入力し、Googleに接続。
7. 同期前にJSONバックアップを保管。確認画面を読んでから同期。

【安全性と制約】
・OAuthクライアントシークレットはブラウザに入力・アップロードしないこと。
・GitHub Pagesにアップロードした内容は原則公開されます。個人情報・秘密鍵・バックアップは絶対に公開しないでください。
・Googleアクセストークンはページのメモリ内のみ。予定・タスク・習慣はブラウザlocalStorageに保存。
・Google連携はHTTPSまたはlocalhostのみ。file://で開くと認証できません。
・Google同期の直前にJSONバックアップを自動ダウンロードし、Googleへの書き込み件数を確認します。
・複数の端末で使う場合、予定はGoogle同期で共有できますが、タスク・習慣は共有されません。
・同期時の権限はGoogleカレンダーの予定を編集できる広い権限です。テスト用アカウントでの確認を推奨します。
