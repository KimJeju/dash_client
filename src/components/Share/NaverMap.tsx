import React, { useEffect, useRef } from 'react';
import { GetAllCulturePolygon, GetAllCultureScanners, GetAllCultureZones } from 'components/Utils/Apis';
import {
  ICulturePolygonModel,
  ICultureScannersModel,
  ICultureZoneModel,
  IScannerStatusModel,
} from 'components/Models/ScannerInfoModel';
import Swal from 'sweetalert2';

export default function NaverMap({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const initMap = async () => {
    //최대반경
    //   const maxBound = new naver.maps.LatLngBounds(
    //     new naver.maps.LatLng(36.066790675543096, 129.20016878575385),
    //     new naver.maps.LatLng(35.85316740170008, 129.61569385653544),
    //   );
    let scanners = await GetAllCultureScanners(); //마커용 스캐너 정보
    let zones = await GetAllCultureZones();
    let polygon = await GetAllCulturePolygon();

    // 스캐너 상태 가져오기 API
    const deviceStatus = await fetch(`${process.env.NEXT_PUBLIC_API_pohang_URL}/DeviceStatus`).then((response) => {
      return response.json();
    });

    const mapOptions = {
      center: new naver.maps.LatLng(lat, lon), //최초위치 영일대 해수욕장
      zoom: zoom,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN,
        position: naver.maps.Position.TOP_RIGHT,
      },
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.TOP_CENTER,
      },
    };
    mapRef.current = new naver.maps.Map('map', mapOptions as any);

    // 폴리곤 생성
    polygon.forEach((polygon: ICulturePolygonModel) => {
      let location_list: any[] = [];
      Object.values(polygon.polygon).forEach((el: any) => {
        location_list.push(new naver.maps.LatLng(el.lat, el.lon));
      });

      var polygons = new naver.maps.Polygon({
        map: mapRef.current as naver.maps.Map,
        paths: [location_list],
        fillColor: polygon.bound_color,
        fillOpacity: 0.3,
        strokeColor: polygon.bound_color,
        strokeOpacity: 0.6,
        strokeWeight: 2,
        clickable: true,
      });
      naver.maps.Event.addListener(polygons, 'click', function () {
        Swal.fire({
          //background : '#fff',
          title:
            '<div style="color:black;font-size:20px">' +
            '<div style="color:blue">' +
            polygon.zone +
            '</div>' +
            '총 면적 : ' +
            polygon.extent +
            'm²' +
            '</div>',
        });
      });
    });

    // 존 정보 생성
    zones.forEach((zone: ICultureZoneModel) => {
      let textlat = zone.textlat as unknown as number;
      let textlon = zone.textlon as unknown as number;
      // 존이름 생성
      new naver.maps.Marker({
        map: mapRef.current as naver.maps.Map,
        position: new naver.maps.LatLng(textlat, textlon),
        title: zone.zonename,
        icon: {
          content:
            '<div style="text-align:center; font-size:13pt; color:' +
            zone.boundcolor +
            '; font-weight:bolder; text-shadow:1px 1px 1px #000;">' +
            zone.zonename +
            '</div>',
        },
      });

      let circlelat = zone.lat as unknown as number;
      let circlelon = zone.lon as unknown as number;
      let radius = zone.radius as unknown as number; //원 반경
      if (radius !== 0) {
        let radiuses = new naver.maps.Circle({
          map: mapRef.current as naver.maps.Map,
          center: new naver.maps.LatLng(circlelat, circlelon),
          radius: radius,
          strokeColor: zone.boundcolor,
          strokeWeight: 2,
          fillColor: zone.boundcolor,
          fillOpacity: 0.2,
          clickable: true,
        });
        naver.maps.Event.addListener(radiuses, 'click', function () {
          Swal.fire({
            //background : '#fff',
            title:
              '<div style="color:black;font-size:20px">' +
              '<div style="color:blue">' +
              zone.zone +
              '</div>' +
              '총 면적 : ' +
              zone.extent +
              'm²' +
              '</div>',
          });
        });
      }
    });

    // 마커 생성
    scanners.forEach((scanner: ICultureScannersModel) => {
      let diffMac = scanner.mac;
      // console.log('diffMac', diffMac);

      deviceStatus.forEach((deviceStatus: IScannerStatusModel) => {
        if (diffMac === deviceStatus.MAC && deviceStatus.ALIVE === 1) {
          // console.log('Alive Scanners', deviceStatus.MAC);
          scanner.status = 'ON';
        } else if (diffMac === deviceStatus.MAC && deviceStatus.ALIVE === 0) {
          scanner.status = 'OFF';
        }
      });
      // console.log('scanner.status', scanner.status);
      // 마커 정보
      var contentString = [
        `<div style="padding : 5px; color : black;  display : flex; flex-direction : column; 
        border-radius : 10px; background-color : #fff;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);>`,
        `<span style="font-weight : bold; border-bottom : 1px dashed black; padding-bottom : 3px">${scanner.zone}</span>`,
        `<div style="border : 1px dashed grey"></div>`,
        `<span style="font-weight : bold; font-size : 0.8em">MAC : ${scanner.mac}</span>`,
        `<span style="font-weight : bold; font-size : 0.8em">INTMAC : ${scanner.intmac}</span>`,
        `<span style="font-weight : normal; font-size : 0.8em">Info : ${scanner.type}</span>`,
        `<span style="font-weight : normal; font-size : 0.8em">LOC : ${scanner.emplace_loc}</span>`,
        `<span style="font-weight : normal; font-size : 0.8em">Status : ${scanner.status}</span>`,
        '</div>',
      ].join('');

      let lat = scanner.lat as unknown as number;
      let lon = scanner.lon as unknown as number;
      let scanner_img = '';
      if (scanner.status === 'ON') {
        scanner_img = `icons/scanner_${scanner.scanner_color}.png`;
      } else {
        scanner_img = `icons/scanner_error.png`;
      }
      let marker = new naver.maps.Marker({
        // 생성될 마커의 위치
        position: new naver.maps.LatLng(lat, lon),
        // 마커를 표시할 Map 객체
        map: mapRef.current as naver.maps.Map,
        // 마커의 모양
        icon: {
          url: scanner_img,
          size: new naver.maps.Size(38, 38),
          scaledSize: new naver.maps.Size(38, 38),
        },
        // 마커의 쌓임 순서
        zIndex: 999,
      });
      // 인포창
      var infowindow = new naver.maps.InfoWindow({
        content: contentString,
        maxWidth: 250,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: scanner.scanner_color,
        anchorSize: new naver.maps.Size(30, 30),
        anchorSkew: true,
        anchorColor: '#fff',
        pixelOffset: new naver.maps.Point(20, -20),
      });
      naver.maps.Event.addListener(marker, 'click', function () {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(mapRef.current as naver.maps.Map, marker);
        }
      });
    });
  };
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
    }
  }, []);
  initMap();
  return <div id="map" style={{ width: '100%', height: '600px' }} />;
}
