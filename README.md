Work in progres...

<p>
    <strong>ducker.io-backend</strong> — Express.js + sqlite3 (REST API with <i>one file</i> database) + Base Authentication (login + sha256 password)
</p>
<p>
    <strong>ducker.io-frontend</strong> — Angular 4.0 (based on latest 2.x version) Single Page Application (SPA) with Webpack 2 (from <a href="https://github.com/AngularClass/angular2-webpack-starter" target="_blank">angular-2-webpack-starter</a>)
</p>
<p>
    <strong>ducker.io-static</strong> — Express.js server for static files (jpg,png... and etc).
</p>

<h2>ducker.io-backend</h2>
``npm install``
``npm start``

<h2>ducker.io-frontend</h2>
``npm install``

<p><strong>Then you need to update Angular to 4.0</strong><br/>
(see: http://angularjs.blogspot.ru/2017/03/angular-400-now-available.html)</p>

``
    npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest typescript@latest --save
``

<p><strong>Update Material</strong>
(see: https://material.angular.io/guide/getting-started)
</p>

<p>``
    npm install --save @angular/material
``</p>

<h2>ducker.io-static</h2>
``npm install``
``npm start``