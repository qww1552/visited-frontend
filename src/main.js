import * as KakaoMap from "./map";
import * as Geo from "./geolocation";
import init from "./form-method";
import * as Render from "./render";
import "./main.css";

window.onload = async () => {
    init();
    const currentPosition = await Geo.getLocation();
    KakaoMap.setCenter(currentPosition.coords);
    Render.drawPage();
};
