# Mapbox GL JS Setup Guide

## 获取 Mapbox Access Token

1. 访问 [Mapbox 官网](https://account.mapbox.com/access-tokens/)
2. 注册或登录您的账户
3. 创建一个新的 Access Token 或使用默认的 Public Token
4. 复制您的 Access Token

## 配置项目

在 `src/js/map.js` 文件中，找到以下行：

```javascript
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazc3MWIwOGYwMDBvM25xbXNiemJ1b3Z3In0.example-token-replace-with-yours';
```

将 `'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazc3MWIwOGYwMDBvM25xbXNiemJ1b3Z3In0.example-token-replace-with-yours'` 替换为您的实际 Mapbox Access Token。

例如：
```javascript
mapboxgl.accessToken = 'pk.eyJ1IjoidXNlcm5hbWUiLCJhIjoiY2wwMDAwMDAwMDAwMDBiMTExMTExMTExMTExMSJ0.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop';
```

## 注意事项

- Mapbox 免费层级每月提供 50,000 次地图加载
- 请不要在公开的代码仓库中提交您的 Access Token
- 对于生产环境，建议使用环境变量来管理 Access Token

## 地图样式

您可以在 `map.js` 中更改地图样式：

```javascript
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // 更改这里的样式
    center: [104, 35.5],
    zoom: 3
});
```

可用的样式包括：
- `mapbox://styles/mapbox/streets-v11` - 街道视图
- `mapbox://styles/mapbox/light-v10` - 浅色主题
- `mapbox://styles/mapbox/dark-v10` - 深色主题
- `mapbox://styles/mapbox/satellite-v9` - 卫星视图
- `mapbox://styles/mapbox/outdoors-v11` - 户外地图
