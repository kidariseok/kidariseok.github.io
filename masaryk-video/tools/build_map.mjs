// Project Natural Earth countries (world-atlas 50m) into a fixed "map space"
// for the Europe scenes. Output: motion/assets/europe.js (window.EUROPE = {...})
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoConicConformal, geoPath, geoGraticule10, geoDistance } from "d3-geo";

const W = 4000, H = 3000;
const topo = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/countries-50m.json", import.meta.url)));
const countries = feature(topo, topo.objects.countries).features;

const proj = geoConicConformal()
  .parallels([40, 60])
  .rotate([-12, 0])
  .center([0, 50.5])
  .scale(5200)
  .translate([W / 2, H / 2])
  .clipExtent([[-50, -50], [W + 50, H + 50]]);
const path = geoPath(proj).digits(1);

const out = [];
for (const f of countries) {
  const d = path(f);
  if (!d || d.length < 20) continue;
  out.push({ id: f.id, name: f.properties.name, d });
}

const CITIES = {
  London: [-0.128, 51.507], Sheffield: [-1.470, 53.381], Amsterdam: [4.895, 52.370],
  Berlin: [13.405, 52.520], Madrid: [-3.704, 40.417], Prague: [14.438, 50.075],
  Brno: [16.608, 49.195], Vienna: [16.373, 48.208], Budapest: [19.040, 47.498],
  Bratislava: [17.107, 48.148], Krakow: [19.945, 50.065], Munich: [11.575, 48.137],
  Frankfurt: [8.682, 50.110], Paris: [2.352, 48.857], Rome: [12.496, 41.903],
  Barcelona: [2.173, 41.385], Copenhagen: [12.568, 55.676], Warsaw: [21.012, 52.230],
  Zurich: [8.541, 47.377], Lisbon: [-9.139, 38.722], Dublin: [-6.260, 53.350],
  Brussels: [4.352, 50.847], Venice: [12.316, 45.441], Salzburg: [13.055, 47.809],
  Rotterdam: [4.479, 51.924], Utrecht: [5.121, 52.091], Leiden: [4.497, 52.160],
  Groningen: [6.566, 53.219], Maastricht: [5.690, 50.851], Eindhoven: [5.469, 51.441],
  Seoul: [126.978, 37.566],
};
const cities = {};
const km = {};
for (const [k, ll] of Object.entries(CITIES)) {
  const p = proj(ll);
  cities[k] = [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
  km[k] = Math.round(geoDistance(ll, CITIES.Brno) * 6371);
}
const graticule = path(geoGraticule10());

writeFileSync(new URL("../motion/assets/europe.js", import.meta.url),
  "window.EUROPE=" + JSON.stringify({ W, H, countries: out, cities, kmFromBrno: km, graticule }) + ";\n");
console.log("countries", out.length, "bytes", JSON.stringify(out).length);
console.log(cities, km);
