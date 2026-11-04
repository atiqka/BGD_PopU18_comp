// 1. Load Bangladesh boundary
var bangladesh = ee.FeatureCollection("users/atiqka/bgd_admbnda_adm0_bbs_20201113");

// 2. Load WorldPop under-18 population rasters
var image2022 = ee.Image("projects/atiq-project-july2025/assets/WorldPop_Global2_BGD_2022_age-T").clip(bangladesh);
var image2030 = ee.Image("projects/atiq-project-july2025/assets/WorldPop_Global2_BGD_2030_age-T").clip(bangladesh);

// 3. Get band name
var bandName = image2022.bandNames().get(0);

// 4. Convert pixel values to per km² (assuming 100m resolution → 0.01 km² per pixel)
var image2022_km2 = image2022.select([bandName]).divide(0.01);
var image2030_km2 = image2030.select([bandName]).divide(0.01);

// 5. Define Jenks-like breaks (capped at 1000)
var classBreaks = [0, 50, 100, 150, 200, 300, 400, 500, 600, 800, 1000, 99999];

// 6. Define 11-color palette
var viridis11 = [
  '#440154', '#482475', '#414487', '#355F8D', '#2A788E',
  '#21908C', '#22A884', '#43BF71', '#7AD151', '#BFD53A', '#FDE725'
];

// 7. Visualization parameters
var visParams = {
  min: classBreaks[0],
  max: classBreaks[10],
  palette: viridis11
};

// 8. Create two maps
var map2022 = ui.Map();
var map2030 = ui.Map();

// 9. Add layers
map2022.addLayer(image2022_km2, visParams, 'Under 18 Population (2022)');
map2030.addLayer(image2030_km2, visParams, 'Under 18 Population (2030)');

// 10. Center maps
map2022.centerObject(bangladesh, 7);
map2030.centerObject(bangladesh, 7);

// 11. Link maps
ui.Map.Linker([map2022, map2030]);

// 12. Create legend panel
function createLegend(title) {
  var legend = ui.Panel({
    style: {
      padding: '8px 15px',
      position: 'bottom-right'
    }
  });

  legend.add(ui.Label({
    value: title,
    style: { fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px 0' }
  }));

  for (var i = 0; i < viridis11.length; i++) {
    var colorBox = ui.Label('', {
      backgroundColor: viridis11[i],
      padding: '8px',
      margin: '0 4px 0 0'
    });

    var labelText = (i < viridis11.length - 1)
      ? classBreaks[i] + '–' + classBreaks[i + 1]
      : '≥ ' + classBreaks[i];

    var label = ui.Label(labelText, {
      margin: '0 0 4px 0',
      fontSize: '11px',
      color: '#555'
    });

    var row = ui.Panel([colorBox, label], ui.Panel.Layout.Flow('horizontal'));
    legend.add(row);
  }

  return legend;
}

// 13. Add legends
map2022.add(createLegend('Under 18 Population (per km², 2022)'));
map2030.add(createLegend('Under 18 Population (per km², 2030)'));

// 14. Display maps side by side
var splitPanel = ui.SplitPanel({
  firstPanel: map2022,
  secondPanel: map2030,
  orientation: 'horizontal',
  wipe: true
});
ui.root.widgets().reset([splitPanel]);

// 15. Print diagnostics
print('Band name:', bandName);
print('Under 18 Population Image (2022):', image2022_km2);
print('Under 18 Population Image (2030):', image2030_km2);

