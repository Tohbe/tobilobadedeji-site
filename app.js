/* ============================================================
   Tobiloba Adedeji site engine
   Loads data/site.yml, renders the active page, handles theme,
   nav, mobile menu and scroll reveals.
   ============================================================ */
(function () {
  document.documentElement.classList.add('js');

  /* ---------- icon sprite ---------- */
  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-ext" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></symbol>' +
    '<symbol id="i-chart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M4 20V11M9 20V4M14 20v-6M19 20v-9M3 20h18"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42"/></symbol>' +
    '<symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></symbol>' +
    '<symbol id="i-substack" viewBox="0 0 24 24"><path fill="currentColor" d="M22.54 8.24H1.46V5.41h21.08v2.83zM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46zM22.54 0H1.46v2.84h21.08V0z"/></symbol>' +
    '<symbol id="i-github" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z"/></symbol>' +
    '<symbol id="i-spotify" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/></symbol>' +
    '<symbol id="i-youtube" viewBox="0 0 24 24"><path fill="currentColor" d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24"><path fill="currentColor" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></symbol>' +
    '<symbol id="i-applemusic" viewBox="0 0 24 24"><path fill="currentColor" d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></symbol>' +
    '<symbol id="i-ytmusic" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></symbol>' +
    '<symbol id="i-amazonmusic" viewBox="0 0 24 24"><path fill="currentColor" d="M14.8454 9.4083c-1.3907 1.0194-3.405 1.563-5.1424 1.563a9.333 9.333 0 0 1-6.2768-2.3835c-.1313-.117-.0143-.277.1415-.1846a12.693 12.693 0 0 0 6.285 1.6574c1.5384 0 3.2348-.318 4.7917-.9764.2359-.0985.4328.1538.203.324h-.002zm.5784-.6564c-.1784-.2257-1.1753-.1087-1.6225-.0554-.1374.0164-.158-.1026-.0349-.1867.796-.5558 2.0984-.3958 2.2502-.2092.1539.1867-.041 1.4872-.7856 2.1087-.1149.0964-.2236.0451-.1723-.082.1682-.4165.5436-1.3498.3651-1.5754zm-1.5917-4.1702v-.5394c0-.082.0615-.1375.1374-.1375h2.4348c.078 0 .1395.0554.1395.1354v.4636c0 .078-.0656.1805-.1846.3405L15.0997 6.635c.4677-.0102.9641.0595 1.3887.2974.0964.0534.123.1334.1292.2113v.5744c0 .082-.0882.1723-.1784.123a2.8163 2.8163 0 0 0-2.5723.0062c-.0861.0451-.1743-.0451-.1743-.1251v-.5477c0-.0882.002-.238.0902-.3713l1.4626-2.0881h-1.2718c-.078 0-.1415-.0534-.1436-.1354l.002.002zm4.808-.7466c1.0995 0 1.6944.9395 1.6944 2.1333 0 1.1528-.6564 2.0676-1.6943 2.0676-1.079 0-1.6656-.9395-1.6656-2.1087 0-1.1774.5948-2.0922 1.6656-2.0922zm.0062.7713c-.5456 0-.5805.7384-.5805 1.202 0 .4615-.0061 1.4481.5744 1.4481.5743 0 .601-.7958.601-1.282 0-.318-.0144-.6994-.1108-1.001-.082-.2625-.2482-.3671-.4841-.3671zm-6.008 3.3414c-.0493.041-.1395.0451-.1744.0164-.2543-.1949-.4246-.4923-.4246-.4923-.4061.4123-.6954.5374-1.2225.5374-.6215 0-1.1077-.3835-1.1077-1.1486a1.2512 1.2512 0 0 1 .7897-1.2041c.402-.1764.9641-.2072 1.3928-.2564 0 0 .0349-.4615-.0902-.6297a.521.521 0 0 0-.4164-.1908c-.2728 0-.5395.1477-.5928.4328-.0144.082-.0739.1518-.1395.1436L9.945 5.08a.1292.1292 0 0 1-.1108-.1537c.1641-.8657.9498-1.1282 1.6554-1.1282.361 0 .8307.0964 1.1158.3671.359.3344.3262.7795.3262 1.2677v1.1487c0 .3446.1436.4964.279.681.0471.0677.0574.1477-.002.197-.1519.125-.5703.4881-.5703.4881zm-.7467-1.7969v-.16c-.5353 0-1.1015.115-1.1015.7426 0 .318.1662.5333.4513.5333.2051 0 .3938-.1272.5128-.3344.1436-.2564.1374-.4943.1374-.7815zM2.9278 7.948c-.0472.041-.1375.0163-.1723.0163-.2544-.1949-.4246-.4923-.4246-.4923-.4082.4123-.6954.5374-1.2226.5374-.6235 0-1.1076-.3835-1.1076-1.1486a1.2512 1.2512 0 0 1 .7897-1.2041c.402-.1764.964-.2072 1.3928-.2564 0 0 .0348-.4615-.0903-.6297a.521.521 0 0 0-.4164-.1908c-.2748 0-.5395.1477-.5928.4328-.0143.082-.0759.1518-.1395.1436L.2345 5.08a.1292.1292 0 0 1-.1087-.1537c.162-.8657.9497-1.1282 1.6553-1.1282.361 0 .8308.0964 1.1159.3671.359.3344.324.7795.324 1.2677v1.1487c0 .3446.1437.4964.279.681.0472.0677.0575.1477-.002.197-.1518.125-.5702.4881-.5702.4881zm-.7446-1.797v-.16c-.5354 0-1.1015.115-1.1015.7426 0 .318.164.5333.4512.5333.2052 0 .3939-.1272.5128-.3344.1436-.2564.1375-.4943.1375-.7815zm2.9127-.3343v2.002a.1379.1379 0 0 1-.1395.1374H4.218a.1374.1374 0 0 1-.1395-.1374v-3.766a.1379.1379 0 0 1 .1395-.1375h.6913a.1374.1374 0 0 1 .1374.1374v.482h.0143c.1805-.4758.519-.6994.9744-.6994.4636 0 .7528.2236.962.6995a1.0523 1.0523 0 0 1 1.0215-.6995c.3118 0 .6502.1272.8574.4143.236.318.1867.7795.1867 1.1857v2.3855c0 .076-.0636.1354-.1436.1354H8.181a.1374.1374 0 0 1-.1334-.1354v-2.004c0-.16.0144-.558-.0205-.7077-.0554-.2564-.2215-.3282-.4369-.3282a.4923.4923 0 0 0-.441.3118c-.076.1908-.0698.5087-.0698.724v2.0041c0 .076-.0635.1354-.1435.1354h-.7385a.1374.1374 0 0 1-.1333-.1354v-2.004c0-.4226.0677-1.042-.4574-1.042-.5334 0-.5128.603-.5128 1.042h.002zm16.8077 2.002a.1374.1374 0 0 1-.1374.1374h-.7405a.1374.1374 0 0 1-.1374-.1374v-3.766a.1374.1374 0 0 1 .1374-.1375h.683c.0821 0 .1396.0636.1396.1067v.5764h.0143c.2051-.517.4964-.7631 1.0092-.7631.3323 0 .6564.119.8636.4451.1928.3036.1928.8123.1928 1.1774V7.837a.1395.1395 0 0 1-.1415.119h-.7426a.1395.1395 0 0 1-.1313-.119V5.552c0-.763-.2933-.7856-.4635-.7856-.197 0-.357.1538-.4246.2953a1.7025 1.7025 0 0 0-.1231.722l.002 2.0349z"/></symbol>' +
    '<symbol id="i-tidal" viewBox="0 0 24 24"><path fill="currentColor" d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z"/></symbol>' +
    '<symbol id="i-deezer" viewBox="0 0 24 24"><path fill="currentColor" d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z"/></symbol>' +
    '<symbol id="i-soundcloud" viewBox="0 0 24 24"><path fill="currentColor" d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z"/></symbol>' +
    '<symbol id="i-audiomack" viewBox="0 0 24 24"><path fill="currentColor" d="M.331 11.378s.5418-.089.765.1439c.2234.2332.077.7156-.2195.7237-.2965.01-.5705.063-.765-.1439-.1946-.2066-.1424-.6218.2195-.7237m5.881 3.2925c-.0522.01-.1075-.018-.164-.059-.3884-.5413-.5287-2.3923-.707-2.5025-.185-.1144-.8545 1.0255-2.1862.903-.5569-.051-1.1236-.4121-1.4573-.662.031-.4206.0364-1.4027.8659-1.0833.5038.1939 1.3667.7266 2.1245-.23.8378-1.0579 1.2999-.7506 1.577-.5206.2771.23.0925 1.4259.5058 1.0916.4133-.3343 2.082-2.4103 2.082-2.4103s1.292-1.303 1.4898.067c.1979 1.3698 1.0403 2.8877 1.2635 2.8445.2234-.043 2.8223-5.3253 3.1945-5.666.3722-.3409 1.6252-.2961 1.5657.5781-.0596.8742-.1871 6.308-.1871 6.308s-.147 1.5311.0924.7128c.0992-.3392.206-.6453.3392-1.0024.6414-2.0534 1.734-5.5613 2.2784-7.3688.1252-.4325.233-.8037.3166-1.0891l.0001-.0008a3.5925 3.5925 0 0 1 .0973-.3305c.0455-.1532.0763-.2546.0858-.2813.0243-.068.0925-.1192.1884-.157.0962-.061.1995-.064.3165-.067.3021-.027.6907.012 1.0401.1119.1018 0 .2125.037.3172.1118v.0001s.0063 0 .0151.01c.0023 0 .0048 0 .0073.01.0219.015.0573.045.0983.095.0012 0 .0025 0 .004.01.017.021.0341.045.0515.073.1952.2863.315.814.1948 1.7498-.2996 2.3354-.5316 7.1397-.5316 7.1397s-.0461.2298.4353-.782c.0167-.035.0383-.066.058-.098.026-.017.0552-.042.0913-.085.2974-.3546 1.0968-.5629 1.6512-.5586.2336.028.4293.087.5462.1609.2188.333.0897 1.562.0897 1.562-.4612.043-1.3403.2908-1.6519.3366-.3118.046-.7852 2.0699-1.4433 1.8629-.6581-.2069-2.1246-1.1268-2.1246-1.2533 0-.1102.1152-1.4546.1453-1.8016.0022-.024.004-.046.0058-.068a.152.152 0 0 1 .0014-.014l-.0002.0003c.0213-.2733.0023-.3927-.1239-.1199-.1086.2346-.581 1.7359-1.1078 3.3709-.0556.1429-1.0511 3.1558-1.1818 3.5231-.156.4261-.287.7523-.3776.921-.1378.1867-.3234.3036-.5826.2252-.6465-.1954-1.4654-1.0889-1.473-1.3106-.0155-1.2503.0608-7.973-.2423-7.4127-.311.5744-2.73 4.5608-2.73 4.5608-.0405.01-.0705.01-.1062.01-.1712-.019-.4366-.074-.51-.2384-.004-.01-.0094-.018-.0129-.028-.0035-.01-.0075-.022-.0135-.04-.0329-.1097-.0463-.2289-.0753-.3265-.1082-.3652-.2813-.8886-.463-1.421-.2784-.9079-.5654-1.8366-.6127-1.9391-.0923-.2007-.2268-.116-.3475-.0002-.54.458-1.6868 2.4793-2.7225 2.5898"/></symbol>' +
    '<symbol id="i-boomplay" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M5.5 3.5h13a2 2 0 012 2v13a2 2 0 01-2 2h-13a2 2 0 01-2-2v-13a2 2 0 012-2z"/><path fill="currentColor" d="M10 8l6 4-6 4z"/></symbol>' +
    '<symbol id="i-headphones" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 13.5v-1.5a8 8 0 0116 0v1.5"/><rect x="2.6" y="13" width="4.6" height="7.2" rx="2" fill="currentColor"/><rect x="16.8" y="13" width="4.6" height="7.2" rx="2" fill="currentColor"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4 12.5l5 5 11-11"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></symbol>' +
    '</svg>';
  var sd = document.createElement('div'); sd.innerHTML = SPRITE; document.body.insertBefore(sd.firstChild, document.body.firstChild);

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  window.__toggleTheme = function () {
    var cur = root.getAttribute('data-theme');
    if (!cur) cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  /* ---------- helpers ---------- */
  function q(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ico(id) { return '<svg><use href="#' + id + '"/></svg>'; }
  function has(v) { return v && String(v).trim() !== ''; }
  function enc(s) { return encodeURIComponent(String(s == null ? '' : s)); }

  /* ============================================================
     LISTEN EVERYWHERE
     A per-song / per-release platform picker. Every track and EP
     can be opened on the listener's preferred streaming service —
     exact links where we have them (Spotify, or links pinned in the
     CMS), scoped deep-search links everywhere else, an in-app
     Spotify preview, and a remembered "default platform" so repeat
     visitors jump straight to their service.
     ============================================================ */
  var Listen = (function () {
    var PREF_KEY = 'numa9:platform';
    // Order = relevance for an African gospel audience first, then reach.
    var SERVICES = [
      { key: 'spotify',       name: 'Spotify',       icon: 'i-spotify',     brand: '#1DB954', search: function (q) { return 'https://open.spotify.com/search/' + q; } },
      { key: 'apple',         name: 'Apple Music',   icon: 'i-applemusic',  brand: '#FA2D48', search: function (q) { return 'https://music.apple.com/search?term=' + q; } },
      { key: 'youtube_music', name: 'YouTube Music', icon: 'i-ytmusic',     brand: '#FF0000', search: function (q) { return 'https://music.youtube.com/search?q=' + q; } },
      { key: 'audiomack',     name: 'Audiomack',     icon: 'i-audiomack',   brand: '#FFA200', artistFallback: true, search: function (q) { return 'https://audiomack.com/search?q=' + q; } },
      { key: 'boomplay',      name: 'Boomplay',      icon: 'i-boomplay',    brand: '#F1352B', artistFallback: true, search: function (q) { return 'https://www.boomplay.com/search/' + q; } },
      { key: 'youtube',       name: 'YouTube',       icon: 'i-youtube',     brand: '#FF0000', search: function (q) { return 'https://www.youtube.com/results?search_query=' + q; } },
      { key: 'amazon',        name: 'Amazon Music',  icon: 'i-amazonmusic', brand: '#25D1DA', search: function (q) { return 'https://music.amazon.com/search/' + q; } },
      { key: 'tidal',         name: 'Tidal',         icon: 'i-tidal',       brand: '',        search: function (q) { return 'https://tidal.com/search?q=' + q; } },
      { key: 'deezer',        name: 'Deezer',        icon: 'i-deezer',      brand: '#A238FF', search: function (q) { return 'https://www.deezer.com/search/' + q; } }
    ];
    var byKey = {}; SERVICES.forEach(function (s) { byKey[s.key] = s; });

    var items = [];        // registry: render pushes items, DOM references them by index
    var artistLinks = {};  // artist-level profile links, used as a fallback for some services
    var current = null;    // open dialog element
    var lastFocus = null;

    function register(item) { items.push(item); return items.length - 1; }
    function setArtistLinks(map) { artistLinks = map || {}; }
    function svc(k) { return byKey[k] || null; }
    function getPref() { try { return localStorage.getItem(PREF_KEY) || ''; } catch (e) { return ''; } }
    function setPref(k) { try { localStorage.setItem(PREF_KEY, k); } catch (e) {} }
    function clearPref() { try { localStorage.removeItem(PREF_KEY); } catch (e) {} }

    // Resolve the best URL for a service, given one item.
    function urlFor(item, s) {
      var links = item.links || {};
      if (has(links[s.key])) return { url: links[s.key], exact: true };
      if (s.key === 'spotify' && has(item.spotify)) return { url: item.spotify, exact: true };
      if (s.key === 'youtube' && has(item.youtube)) return { url: item.youtube, exact: true };
      // Some services (Audiomack, Boomplay) have no per-song link and weak
      // in-app search, so send any click to the artist profile instead.
      if (s.artistFallback && has(artistLinks[s.key])) return { url: artistLinks[s.key], exact: false, viaArtist: true };
      return { url: s.search(enc(item.query)), exact: false };
    }

    // Derive a no-login Spotify embed player URL from a Spotify link.
    function embedFor(url) {
      var m = /open\.spotify\.com\/(track|album|artist|playlist)\/([A-Za-z0-9]+)/.exec(url || '');
      return m ? 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?utm_source=generator' : null;
    }

    function bestFallback(item) {
      if (has(item.spotify)) return item.spotify;
      return SERVICES[0].search(enc(item.query));
    }

    function tileHTML(item, s, pref) {
      var r = urlFor(item, s);
      var isPref = pref === s.key;
      return '<a class="listen-tile' + (isPref ? ' is-pref' : '') + '" href="' + esc(r.url) + '" target="_blank" rel="noopener" data-svc="' + s.key + '"' +
          (s.brand ? ' style="--brand:' + s.brand + '"' : '') + '>' +
        '<span class="listen-ic">' + ico(s.icon) + '</span>' +
        '<span class="listen-nm">' + esc(s.name) + '</span>' +
        (r.exact ? '<span class="listen-exact" title="Exact match">' + ico('i-check') + '</span>' : '') +
        (isPref ? '<span class="listen-def">Default</span>' : '') +
      '</a>';
    }

    function render(item) {
      var pref = getPref();
      var prefSvc = svc(pref);
      var typeLabel = item.type === 'artist' ? 'Artist' : (item.type === 'ep' ? 'Release' : 'Song');

      var primary = '';
      if (prefSvc) {
        var pr = urlFor(item, prefSvc);
        primary =
          '<div class="listen-primwrap">' +
            '<a class="listen-primary" href="' + esc(pr.url) + '" target="_blank" rel="noopener" data-svc="' + prefSvc.key + '"' +
              (prefSvc.brand ? ' style="--brand:' + prefSvc.brand + '"' : '') + '>' +
              '<span class="listen-ic">' + ico(prefSvc.icon) + '</span>' +
              '<span class="listen-primlabel">Open in ' + esc(prefSvc.name) + '</span>' + ico('i-ext') +
            '</a>' +
            '<div class="listen-primnote">Your saved platform · <button type="button" class="listen-clear">change</button></div>' +
          '</div>';
      }

      var embed = embedFor(item.spotify);
      var preview = embed
        ? '<div class="listen-preview"><button type="button" class="listen-previewbtn">' + ico('i-play') + '<span>Preview the sound</span></button><div class="listen-embed" hidden></div></div>'
        : '';

      var tiles = SERVICES.map(function (s) { return tileHTML(item, s, pref); }).join('');

      var all = has(item.spotify)
        ? '<div class="listen-foot"><a class="listen-all" href="https://song.link/' + esc(item.spotify) + '" target="_blank" rel="noopener">Match this exact ' +
            (item.type === 'ep' ? 'release' : 'song') + ' on every platform ' + ico('i-arrow') + '</a></div>'
        : '';

      return '<div class="listen-card" role="document">' +
          '<button type="button" class="listen-x" aria-label="Close">' + ico('i-close') + '</button>' +
          '<div class="listen-head">' +
            (has(item.cover) ? '<img class="listen-cover" src="' + esc(item.cover) + '" alt="">' : '') +
            '<div class="listen-meta"><div class="listen-kicker">Numa.9 · ' + typeLabel + '</div>' +
              '<div class="listen-title">' + esc(item.title) + '</div></div>' +
          '</div>' +
          preview + primary +
          '<div class="listen-label">' + (primary ? 'Or choose another' : 'Choose where to listen') + '</div>' +
          '<div class="listen-grid">' + tiles + '</div>' +
          all +
        '</div>';
    }

    function togglePreview(wrap, item, btn) {
      var box = wrap.querySelector('.listen-embed');
      if (!box) return;
      if (box.hasAttribute('hidden')) {
        if (!box.getAttribute('data-loaded')) {
          box.innerHTML = '<iframe style="border-radius:12px;display:block" src="' + esc(embedFor(item.spotify)) +
            '" width="100%" height="152" frameborder="0" loading="lazy" allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture"></iframe>';
          box.setAttribute('data-loaded', '1');
        }
        box.removeAttribute('hidden'); btn.classList.add('on');
      } else { box.setAttribute('hidden', ''); btn.classList.remove('on'); }
    }

    function onKey(e) { if (e.key === 'Escape') close(); }

    function close() {
      if (!current) return;
      document.removeEventListener('keydown', onKey);
      var el = current; current = null;
      el.classList.remove('open');
      document.documentElement.classList.remove('listen-lock');
      setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, 280);
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    }

    function open(item) {
      if (!item) return;
      if (current) close();
      lastFocus = document.activeElement;
      var wrap = document.createElement('div');
      wrap.className = 'listen';
      wrap.setAttribute('role', 'dialog');
      wrap.setAttribute('aria-modal', 'true');
      wrap.setAttribute('aria-label', 'Listen to ' + item.title);
      wrap.innerHTML = '<div class="listen-backdrop"></div>' + render(item);
      document.body.appendChild(wrap);
      current = wrap;
      document.documentElement.classList.add('listen-lock');

      wrap.querySelector('.listen-backdrop').addEventListener('click', close);
      wrap.querySelector('.listen-x').addEventListener('click', close);
      wrap.querySelectorAll('.listen-tile, .listen-primary').forEach(function (t) {
        t.addEventListener('click', function () {
          var k = t.getAttribute('data-svc'); if (k) setPref(k);
          setTimeout(close, 140);
        });
      });
      var clear = wrap.querySelector('.listen-clear');
      if (clear) clear.addEventListener('click', function () { clearPref(); wrap.innerHTML = '<div class="listen-backdrop"></div>' + render(item); rebind(wrap, item); });
      var pv = wrap.querySelector('.listen-previewbtn');
      if (pv) pv.addEventListener('click', function () { togglePreview(wrap, item, pv); });

      document.addEventListener('keydown', onKey);
      requestAnimationFrame(function () { wrap.classList.add('open'); });
      var x = wrap.querySelector('.listen-x'); if (x) x.focus();
    }

    // Re-attach handlers after an in-place re-render (used by "change default").
    function rebind(wrap, item) {
      wrap.querySelector('.listen-backdrop').addEventListener('click', close);
      wrap.querySelector('.listen-x').addEventListener('click', close);
      wrap.querySelectorAll('.listen-tile, .listen-primary').forEach(function (t) {
        t.addEventListener('click', function () { var k = t.getAttribute('data-svc'); if (k) setPref(k); setTimeout(close, 140); });
      });
      var pv = wrap.querySelector('.listen-previewbtn');
      if (pv) pv.addEventListener('click', function () { togglePreview(wrap, item, pv); });
      var x = wrap.querySelector('.listen-x'); if (x) x.focus();
    }

    var wired = false;
    function wire() {
      if (wired) return; wired = true;
      document.addEventListener('click', function (e) {
        var t = e.target.closest ? e.target.closest('[data-listen]') : null;
        if (!t) return;
        var idx = parseInt(t.getAttribute('data-listen'), 10);
        if (idx >= 0 && items[idx]) { e.preventDefault(); open(items[idx]); }
      });
    }

    return {
      register: register, open: open, wire: wire, bestFallback: bestFallback,
      setArtistLinks: setArtistLinks,
      pref: getPref, svc: svc, reset: function () { items = []; artistLinks = {}; }
    };
  })();

  /* ---------- nav / menu / reveal (wire after DOM ready) ---------- */
  function wireChrome() {
    var nav = q('nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 30); };
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }
    var burger = q('hamburger'), mm = q('mm');
    if (burger && mm) {
      burger.addEventListener('click', function () { mm.classList.toggle('open'); });
      mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { mm.classList.remove('open'); }); });
    }
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.addEventListener('click', function () { window.__toggleTheme(); });
    });
  }
  function wireReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
    // Safety nets: never leave content hidden if the observer misfires (some
    // mobile browsers don't fire for elements already in view at load).
    function revealInView() {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight * 1.15) e.classList.add('in');
      });
    }
    setTimeout(revealInView, 400);
    window.addEventListener('load', function () { setTimeout(revealInView, 200); });
    // Absolute fallback: after 2.5s, show everything regardless.
    setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 2500);
  }

  /* ---------- social buttons (only render filled links) ---------- */
  function socialBtns(id, cls) {
    var out = '';
    function b(url, icon, label) { if (has(url)) out += '<a class="' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + ico(icon) + ' ' + label + '</a>'; }
    var i = id;
    b(i.linkedin, 'i-linkedin', 'LinkedIn');
    b(i.twitter, 'i-x', 'X');
    b(i.substack, 'i-substack', 'Substack');
    b(i.github, 'i-github', 'GitHub');
    return out;
  }
  function musicBtns(n, cls) {
    var out = '';
    function b(url, icon, label, extra) { if (has(url)) out += '<a class="' + cls + (extra || '') + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + ico(icon) + ' ' + label + '</a>'; }
    b(n.spotify, 'i-spotify', 'Spotify');
    b(n.youtube, 'i-youtube', 'YouTube');
    b(n.tiktok, 'i-tiktok', 'TikTok');
    b(n.instagram, 'i-instagram', 'Instagram');
    return out;
  }
  // Decorative "available everywhere" icon strip for the Numa hero.
  function platformStrip() {
    var icons = ['i-spotify', 'i-applemusic', 'i-ytmusic', 'i-audiomack', 'i-boomplay', 'i-amazonmusic', 'i-tidal', 'i-deezer'];
    return '<span class="hero-plats-label">On every platform</span><span class="hero-plats-row">' +
      icons.map(function (i) { return '<span class="hp">' + ico(i) + '</span>'; }).join('') + '</span>';
  }

  /* ---------- renderers ---------- */
  function renderHome(d) {
    var id = d.identity;
    if (q('land-intro')) q('land-intro').innerHTML = esc(id.short_intro);
    if (q('door-work-line')) q('door-work-line').textContent = id.door_work || '';
    if (q('door-music-line')) q('door-music-line').textContent = id.door_music || '';
    if (q('land-links')) q('land-links').innerHTML =
      '<a href="mailto:' + esc(id.email) + '">' + esc(id.email) + '</a>' +
      (has(id.linkedin) ? '<a href="' + esc(id.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : '') +
      '<a href="' + esc(id.spotify || d.numa9.spotify) + '" target="_blank" rel="noopener">Numa.9 on Spotify</a>';
  }

  function renderWork(d) {
    var id = d.identity, w = d.work;
    q('work-hero').innerHTML =
      '<div class="reveal">' +
        '<a class="back" href="index.html">' + ico('i-arrow') + ' Home</a>' +
        (id.available !== false ? '<div class="pill"><span class="dot"></span> Open to work &amp; collaboration</div>' : '') +
        '<h1>' + esc(w.headline) + '</h1>' +
        '<p class="lede">' + esc(w.tagline) + '</p>' +
        '<div class="subhero-cta">' +
          '<a class="btn btn-solid" href="#contact">Get in touch</a>' +
          '<a class="btn btn-ghost" href="numa9.html">Visit Numa.9 ' + ico('i-arrow') + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="subhero-portrait reveal d1"><img src="' + esc(id.photo) + '" alt="' + esc(id.name) + '"></div>';

    q('work-about').innerHTML = '<div class="prose reveal"><p>' + esc(w.bio_1) + '</p><p>' + esc(w.bio_2) + '</p></div>' +
      '<div class="chips reveal d1" style="margin-top:26px">' + (w.domains || []).map(function (x) { return '<span class="chip">' + esc(x.name) + '</span>'; }).join('') + '</div>';

    q('work-tools').innerHTML = '<div class="tools-grid">' + (w.tools || []).map(function (t, i) {
      return '<div class="tool reveal' + (i % 3 ? ' d' + (i % 3) : '') + '">' +
        (has(t.logo) ? '<img src="' + esc(t.logo) + '" alt="' + esc(t.name) + '">' : '') +
        '<div><div class="tname">' + esc(t.name) + '</div><div class="tlvl">' + esc(t.level) + '</div></div></div>';
    }).join('') + '</div>' +
    '<div class="chips protags reveal">' + (w.professional || []).map(function (x) { return '<span class="chip">' + esc(x.name) + '</span>'; }).join('') + '</div>';

    q('work-projects').innerHTML = '<div class="proj-grid">' + (w.projects || []).map(function (p, i) {
      var shot = has(p.image)
        ? '<div class="shot"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + '"></div>'
        : '<div class="noshot">' + ico('i-chart') + '</div>';
      var tools = (p.tools || []).map(function (t) { return '<span class="badge">' + esc(t.name) + '</span>'; }).join('');
      var link = has(p.link) ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener" style="position:absolute;inset:0" aria-label="Open ' + esc(p.title) + '"></a>' : '';
      return '<div class="proj reveal' + (i % 2 ? ' d1' : '') + '" style="position:relative">' +
        (p.featured ? '<span class="featured-tag">Featured</span>' : '') + shot +
        '<div class="body"><h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p><div class="ptools">' + tools + '</div></div>' + link + '</div>';
    }).join('') + '</div>';

    q('work-exp').innerHTML =
      '<div class="reveal"><div class="blk-h">Experience</div><div class="timeline">' +
        (w.experience || []).map(function (e) {
          return '<div class="tl-row"><div><div class="role">' + esc(e.role) + '</div><div class="co">' + esc(e.company) + ' · ' + esc(e.location) + '</div></div>' +
            '<div class="when' + (e.current ? ' ' : '') + '">' + (e.current ? '<span class="cur">' + esc(e.period) + '</span>' : esc(e.period)) + '</div></div>';
        }).join('') +
      '</div></div>' +
      '<div class="reveal d1"><div class="blk-h">Education</div>' +
        (w.education || []).map(function (e) {
          return '<div class="edu"><div class="deg">' + esc(e.degree) + '</div><div class="sch">' + esc(e.school) + ' · ' + esc(e.period) + '</div>' +
            (has(e.note) ? '<div class="note">' + esc(e.note) + '</div>' : '') + '</div>';
        }).join('') +
      '</div>';

    q('work-certs').innerHTML = '<div class="cert-grid">' + (d.work.certifications || []).map(function (c, i) {
      return '<div class="cert reveal' + (i % 2 ? ' d1' : '') + '">' + (has(c.logo) ? '<img src="' + esc(c.logo) + '" alt="">' : '') +
        '<div><div class="cn">' + esc(c.name) + '</div><div class="ci">' + esc(c.issuer) + '</div></div></div>';
    }).join('') + '</div>';

    renderContact(d, 'work');
  }

  function renderNuma(d) {
    var n = d.numa9, id = d.identity;
    var eps = n.eps || [];
    var heroCover = n.hero_cover || (eps[0] && eps[0].cover) || n.cover;

    Listen.reset();
    // Artist-level links: fold the existing single fields into the platform map.
    var artistLinks = {};
    var np = n.platforms || {};
    ['apple', 'youtube_music', 'amazon', 'tidal', 'deezer', 'soundcloud', 'audiomack', 'boomplay'].forEach(function (k) { if (has(np[k])) artistLinks[k] = np[k]; });
    if (has(n.apple)) artistLinks.apple = n.apple;
    if (has(n.youtube)) artistLinks.youtube = n.youtube;
    Listen.setArtistLinks(artistLinks);
    var artistIdx = Listen.register({ type: 'artist', title: 'Numa.9', query: 'Numa.9', cover: heroCover, spotify: n.spotify, youtube: n.youtube, links: artistLinks });

    var pref = Listen.pref(), prefSvc = Listen.svc(pref);
    var heroLabel = prefSvc ? ('Listen · ' + prefSvc.name) : 'Listen everywhere';

    q('numa-hero').innerHTML =
      '<div class="reveal">' +
        '<a class="back" href="index.html">' + ico('i-arrow') + ' Home</a>' +
        '<div class="pill">' + esc(n.hero_kind || 'Out now') + '</div>' +
        '<h1>Numa.9</h1>' +
        '<p class="lede">' + esc(n.tagline) + '</p>' +
        '<div class="subhero-cta">' +
          '<button type="button" class="btn btn-solid" data-listen="' + artistIdx + '">' + ico('i-headphones') + ' ' + esc(heroLabel) + '</button>' +
          '<a class="btn btn-ghost" href="work.html">View the portfolio ' + ico('i-arrow') + '</a>' +
        '</div>' +
        '<div class="hero-plats" aria-hidden="true">' + platformStrip() + '</div>' +
      '</div>' +
      '<div class="subhero-portrait reveal d1" style="aspect-ratio:1"><img src="' + esc(heroCover) + '" alt="Numa.9 cover art" style="object-position:center"></div>';

    q('numa-release').innerHTML = eps.map(function (ep, ei) {
      var epIdx = Listen.register({ type: 'ep', title: ep.title, query: 'Numa.9 ' + ep.title, cover: ep.cover, spotify: ep.link, links: ep.platforms || {} });
      var art =
        '<a class="art" href="' + esc(ep.link || Listen.bestFallback({ query: 'Numa.9 ' + ep.title })) + '" data-listen="' + epIdx + '" aria-label="Listen to ' + esc(ep.title) + '">' +
          '<img src="' + esc(ep.cover) + '" alt="' + esc(ep.title) + ' cover"><span class="play"><span>' + ico('i-play') + '</span></span></a>';
      var head =
        '<div class="release">' + art +
          '<div><div class="kind">' + esc(ep.kind) + '</div><h2>' + esc(ep.title) + '</h2>' +
            '<p class="release-note">Stream it on every major platform — pick yours.</p>' +
            '<div class="streams">' +
              '<button type="button" class="stream stream-primary" data-listen="' + epIdx + '">' + ico('i-headphones') + ' Listen everywhere</button>' +
              (has(ep.link) ? '<a class="stream" href="' + esc(ep.link) + '" target="_blank" rel="noopener">' + ico('i-spotify') + ' Spotify</a>' : '') +
            '</div>' +
          '</div></div>';
      var tracks = '<div class="catalogue eptracks">' + (ep.tracks || []).map(function (t, i) {
        var num = ('0' + (i + 1)).slice(-2);
        var tIdx = Listen.register({ type: 'track', title: t.title, query: 'Numa.9 ' + t.title, cover: ep.cover, spotify: t.link, links: t.platforms || {} });
        return '<a class="cat-row" href="' + esc(t.link || Listen.bestFallback({ query: 'Numa.9 ' + t.title })) + '" data-listen="' + tIdx + '">' +
          '<span class="num">' + num + '</span><div class="ct"><div class="t">' + esc(t.title) + '</div></div>' +
          '<span class="go">Listen ' + ico('i-headphones') + '</span></a>';
      }).join('') + '</div>';
      return '<div class="ep reveal' + (ei ? ' d1' : '') + '">' + head + tracks + '</div>';
    }).join('');

    var vids = n.videos || [];
    if (q('numa-catalogue')) q('numa-catalogue').innerHTML = vids.length
      ? '<div class="catalogue">' + vids.map(function (c, i) {
          var num = ('0' + (i + 1)).slice(-2);
          return '<a class="cat-row reveal" href="' + esc(c.link) + '" target="_blank" rel="noopener">' +
            '<span class="num">' + num + '</span><div class="ct"><div class="t">' + esc(c.title) + '</div><div class="k">Watch on YouTube</div></div>' +
            '<span class="go">Open ' + ico('i-ext') + '</span></a>';
        }).join('') + '</div>'
      : '';

    q('numa-about').innerHTML = '<div class="prose reveal"><p>' + esc(n.about_1) + '</p><p>' + esc(n.about_2) + '</p></div>';

    renderContact(d, 'numa');
  }

  function renderContact(d, ctx) {
    var el = q('contact-render'); if (!el) return;
    var id = d.identity, n = d.numa9;
    var direct =
      '<a class="crow" href="mailto:' + esc(id.email) + '"><span class="ci">' + ico('i-mail') + '</span><span><span class="cx">Email</span><br><span class="cv">' + esc(id.email) + '</span></span></a>' +
      (has(id.whatsapp) ? '<a class="crow" href="https://wa.me/' + esc(String(id.whatsapp).replace(/[^0-9]/g, '')) + '" target="_blank" rel="noopener"><span class="ci">' + ico('i-whatsapp') + '</span><span><span class="cx">Call / WhatsApp</span><br><span class="cv">' + esc(id.whatsapp) + '</span></span></a>' : '') +
      '<div class="crow"><span class="ci">' + ico('i-pin') + '</span><span><span class="cx">Based in</span><br><span class="cv">' + esc(id.location) + '</span></span></div>';

    var second = ctx === 'numa'
      ? '<h4>Follow Numa.9</h4><div class="socialset">' + musicBtns(n, 'sbtn') + '</div>'
      : '<h4>Elsewhere</h4><div class="socialset">' + socialBtns(id, 'sbtn') + '</div>';

    el.innerHTML =
      '<div class="cc reveal"><h4>Reach me directly</h4>' + direct + '</div>' +
      '<div class="cc reveal d1">' + second + '</div>';
  }

  /* ---------- footer ---------- */
  function renderFooter(d) {
    if (q('yr')) q('yr').textContent = new Date().getFullYear();
    if (q('footer-name')) q('footer-name').textContent = d.identity.name;
  }

  /* ---------- boot ---------- */
  function boot(d) {
    var page = document.body.getAttribute('data-page');
    try {
      if (page === 'home') renderHome(d);
      else if (page === 'work') renderWork(d);
      else if (page === 'numa9') renderNuma(d);
      renderFooter(d);
    } catch (e) { console.error('render error', e); }
    wireChrome(); wireReveal(); Listen.wire();
  }

  function start() {
    fetch('data/site.yml', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('yml ' + r.status); return r.text(); })
      .then(function (t) { boot(jsyaml.load(t)); })
      .catch(function (e) {
        console.error('Could not load content:', e);
        // still wire chrome so the page isn't dead
        wireChrome(); wireReveal();
        var h = q('work-hero') || q('numa-hero');
        if (h) h.innerHTML = '<div><h1>Content is loading…</h1><p class="lede">If this persists, the site needs to be served over http (not opened as a local file).</p></div>';
      });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
