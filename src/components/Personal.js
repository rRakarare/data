import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import { CSVReader } from "react-papaparse";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { saveAs } from "file-saver";
import RangeSlider from "react-bootstrap-range-slider";

function Personal() {
  const [tableData, setTableData] = useState([
    ["", 0, 0, { r: 0, g: 0, b: 0, a: 0 }, false],
  ]);

  const createPersonMaskShape = (x, y, width, height, anzahlPers, sc) => {
    let pathString = "";
    for (let i = 1; i < anzahlPers + 1; i++) {
      pathString += `M${x - (width * 1) / 2 - (10.583 * sc) / 2},${
        y + height - sc * 31.75 * i
      }v ${sc * 7.713741} c 0,${sc * -1.8338377} ${sc * 2.649874},${
        sc * -1.8338305
      } ${sc * 5.291667},${sc * -1.8365803} ${sc * 2.649642},${sc * -0.00273} ${
        sc * 5.291665
      },${sc * -0.00273} ${sc * 5.291667},${sc * 1.8365803} v ${
        sc * -7.713741
      } h ${sc * -5.291667} c ${sc * 1.461192},0 ${sc * 2.645834},${
        sc * 1.2333934
      } ${sc * 2.645834},${sc * 2.7548705} 0,${sc * 1.5214803} ${
        sc * -1.184642
      },${sc * 2.7548707} ${sc * -2.645834},${sc * 2.7548707} ${
        sc * -1.461195
      },0 ${sc * -2.645833},${sc * -1.2333904} ${sc * -2.645833},${
        sc * -2.7548707
      } 0,${sc * -1.5214771} ${sc * 1.184638},${sc * -2.7548705} ${
        sc * 2.645833
      },${sc * -2.7548705} z m ${sc * 3.527778},${sc * 31.749999} c ${
        sc * -0.661431
      },0 ${sc * -1.322917},${sc * -0.298665} ${sc * -1.322917},${
        sc * -0.895554
      } v ${sc * -21.3041237} h ${sc * -0.440972} v ${sc * 8.7234977} c 0,${
        sc * 0.826466
      } ${sc * -1.763889},${sc * 0.826466} ${sc * -1.763889},0 v ${
        sc * 13.47618
      } z m 0,0 h ${sc * 3.527778} c ${sc * -0.66143},0 ${sc * -1.322916},${
        sc * -0.298662
      } ${sc * -1.322916},${sc * -0.895554} ${sc * -3e-6},${sc * -2.938537} 0,${
        sc * -11.202932
      } 0,${sc * -11.202932} h ${sc * -0.440973} ${sc * -0.440972} v ${
        sc * 11.202932
      } c 0,${sc * 0.596889} ${sc * -0.661485},${sc * 0.895554} ${
        sc * -1.322917
      },${sc * 0.895554} z m ${sc * 3.527778},0 h ${sc * 3.527778} v ${
        sc * -13.47618
      } c 0,${sc * 0.826466} ${sc * -1.7638887},${sc * 0.826466} ${
        sc * -1.7638887
      },0 ${sc * 4e-6},${sc * -2.846709} 0,${sc * -8.7234977} 0,${
        sc * -8.7234977
      } h ${sc * -0.4409723} c 0,0 ${sc * -3e-6},${sc * 16.9881477} 0,${
        sc * 21.3041237
      } 0,${sc * 0.596892} ${sc * -0.661486},${sc * 0.895554} ${
        sc * -1.322917
      },${sc * 0.895554} z`;
    }
    return pathString;
  };
  const createPersonShape = (x, y, width, height, anzahlPers, sc) => {
    let pathString = "";
    for (let i = 1; i < anzahlPers + 1; i++) {
      pathString += `M${x + width / 2 - (10.583 * sc) / 2},${
        y + height - sc * 31.75 * i
      }m ${sc * 5.2916666},${sc * 19.651482} h ${sc * 0.4409728} c 0,0 ${
        sc * -2.9e-6
      },${sc * 8.264644} 0,${sc * 11.203181} 0,${sc * 1.193782} ${
        sc * 2.6458341
      },${sc * 1.193782} ${sc * 2.6458341},0 ${sc * -2.9e-6},${
        sc * -4.315977
      } 0,${sc * -21.3044125} 0,${sc * -21.3044125} h ${sc * 0.4409718} c 0,0 ${
        sc * 3.9e-6
      },${sc * 5.8770835} 0,${sc * 8.7237915} 0,${sc * 0.826466} ${
        sc * 1.7638887
      },${sc * 0.826466} ${sc * 1.7638887},0 ${sc * -3e-6},-${sc * 3.305855} ${
        sc * 4e-6
      },${sc * -7.805497} 0,${sc * -10.5603755} ${sc * -3e-6},${
        sc * -1.8393136
      } ${sc * -2.6419141},${sc * -1.839317} ${sc * -5.2916674},${
        sc * -1.8365876
      } ${sc * -2.6419044},${sc * 0.00275} ${sc * -5.2916739399524},${
        sc * 0.00275
      } ${sc * -5.2916739399524},${sc * 1.8365876} v ${sc * 10.5603755} c 0,${
        sc * 0.826466
      } ${sc * 1.7638922399524},0.826466 ${sc * 1.7638922399524},0 v ${
        sc * -8.7237915
      } h ${sc * 0.4409729} v ${sc * 21.3044155} c 0,${sc * 1.193779} ${
        sc * 2.6458359
      },${sc * 1.193779} ${sc * 2.6458359},0 v ${sc * -11.203184} z m ${
        sc * 2.6458379
      },${sc * -16.8966039} c 0,${sc * 1.5214804} ${sc * -1.1845841},${
        sc * 2.7548814
      } ${sc * -2.6458379},${sc * 2.7548814} ${sc * -1.4612557},0 ${
        sc * -2.645836
      },${sc * -1.233401} ${sc * -2.645836},${sc * -2.7548814} 0,${
        sc * -1.5214772
      } ${sc * 1.1845803},${sc * -2.7548781} ${sc * 2.645836},${
        sc * -2.7548781
      } ${sc * 1.4612538},0 ${sc * 2.6458379},${sc * 1.2334009} ${
        sc * 2.6458379
      },${sc * 2.7548781} z`;
    }
    return pathString;
  };

  const createColor = (list, a) =>
    `rgba(${list[0]},${list[1]},${list[2]},${a})`;

  const getMaskPath = (x, y, width, height, anzahlPers) => {
    const oneunit = height / anzahlPers;

    const sc = oneunit / 31.75;

    return createPersonMaskShape(x, y, width, height, anzahlPers, sc);
  };

  const getPath = (x, y, width, height, anzahlPers) => {
    const oneunit = height / anzahlPers;

    const sc = oneunit / 31.75;

    return createPersonShape(x, y, width, height, anzahlPers, sc);
  };

  const getVkPath = (x, y, width, height, vkArray, anzahlPers) => {
    let path = "";

    const oneunit = height / anzahlPers;

    const sc = oneunit / 31.75 / 1.05;

    vkArray.forEach((item, i) => {
      const newheight = item * oneunit;
      let addHeight = 0;

      if (i > 0) {
        addHeight = oneunit * i;
      }

      path += `M${x + (width * 3) / 2 - (10.538 * sc) / 2},${
        y + height - addHeight
      }
        l 0 -${newheight}
        l ${10.583 * sc} 0
        l 0 ${newheight}
        Z`;
    });

    return path;
  };

  const MaskBar = (props) => {
    const { fill, x, y, width, height, keyname, anzahl } = props;

    const anzahlPers = anzahl[keyname];

    return (
      <path
        d={getMaskPath(x, y, width, height, anzahlPers)}
        stroke="none"
        fill={fill}
      />
    );
  };

  const PersonBar = (props) => {
    const { fill, fillOpacity, x, y, width, height, keyname, anzahl } = props;

    const anzahlPers = anzahl[keyname];

    return (
      <path
        d={getPath(x, y, width, height, anzahlPers)}
        stroke="none"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    );
  };

  const FillBar = (props) => {
    const {
      fill,
      fillOpacity,
      x,
      y,
      width,
      height,
      keyname,
      vk,
      anzahl,
    } = props;

    const vkArray = vk[keyname];
    const anzahlPers = anzahl[keyname];

    return (
      <path
        d={getVkPath(x, y, width, height, vkArray, anzahlPers)}
        stroke="none"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - 10}
          fontSize={`${fontSize / 100}rem`}
          fontWeight="1000"
          fill="black"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {isNaN(parseFloat(value)) ? "" : parseFloat(value).toFixed(1)}
        </text>
      </g>
    );
  };

  const AnzahlBars = tableData.map((key, i) => (
    <Bar
      dataKey={(data) => data.anzahl[key[0]]}
      shape={<PersonBar keyname={key[0]} />}
      fill={`rgb(${key[3].r},${key[3].g},${key[3].b})`}
      fillOpacity={0.2}
      stackId="a"
    >
      {i === tableData.length - 1 ? (
        <LabelList
          dataKey={(data) => data.labelValue}
          content={renderCustomizedLabel}
          position="top"
        />
      ) : null}
    </Bar>
  ));

  const FillBars = tableData.map((key) => (
    <Bar
      dataKey={(data) => data.anzahl[key[0]]}
      shape={<FillBar keyname={key[0]} />}
      fill={`rgb(${key[3].r},${key[3].g},${key[3].b})`}
      fillOpacity={1}
      stackId="b"
    />
  ));

  const MaskBars = tableData.map((key) => (
    <Bar
      dataKey={(data) => data.anzahl[key[0]]}
      shape={<MaskBar keyname={key[0]} />}
      fill="white"
      stackId="c"
    />
  ));

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnDrop = (data) => {
    setDataset(data);
    setbereichsauswahl(data[0].data);
    setBereichCol(data[0].data[0]);

    setalterauswahl(data[0].data);
    setAlterCol(data[0].data[1]);

    setvkauswahl(data[0].data);
    setVkCol(data[0].data[2]);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const [dataset, setDataset] = useState(null);
  const [data, setData] = useState(null);

  const [bereichsauswahl, setbereichsauswahl] = useState([]);
  const [bereichCol, setBereichCol] = useState("");

  const [alterauswahl, setalterauswahl] = useState([]);
  const [alterCol, setAlterCol] = useState("");

  const [vkauswahl, setvkauswahl] = useState([]);
  const [vkCol, setVkCol] = useState(null);

  const [minAge, setMinAge] = useState(null);
  const [maxAge, setmaxAge] = useState(null);
  const [fontSize, setFontSize] = useState(100);

  const [graphheight, setGraphheight] = useState(300);

  const [resultVis, setResultVis] = useState(false);

  const createData = () => {
    const csvcols = dataset[0].data.length;

    const bereichsIndex = dataset[0].data.findIndex(
      (item) => item == bereichCol
    );

    const altersIndex = dataset[0].data.findIndex((item) => item == alterCol);
    const vkIndex = dataset[0].data.findIndex((item) => item == vkCol);

    const newDataset = dataset.filter((item) => item.data.length == csvcols);

    newDataset.shift();

    const allKeys = newDataset.map((item, i) => {
      return item.data[bereichsIndex];
    });

    const keysunique = new Set(allKeys);

    const keysliste = Array.from(keysunique);

    const newkeys = keysliste.map((item, i) => {
      let color = {};
      console.log(tableData);
      if (data == null) {
        color = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
          a: 1,
        };
      } else {
        color = {
          r: tableData[i][3].r,
          g: tableData[i][3].g,
          b: tableData[i][3].b,
          a: 1,
        };
      }
      return {
        name: item,
        color,
      };
    });

    console.log(newkeys);

    setTableData(
      newkeys.map((item) => {
        return [
          item.name,
          newDataset.filter((it) => it.data[bereichsIndex] == item.name).length,
          newDataset
            .filter((it) => it.data[bereichsIndex] == item.name)
            .map((newit) => parseFloat(newit.data[vkIndex].replace(",", ".")))
            .reduce((a, b) => a + b, 0)
            .toFixed(2),
          {
            r: item.color.r,
            g: item.color.g,
            b: item.color.b,
            a: 1,
          },
          false,
        ];
      })
    );

    const allAges = newDataset.map((item, i) => {
      return parseInt(item.data[altersIndex], 10);
    });

    let min = Math.min(...allAges);
    let max = Math.max(...allAges);

    if (minAge) {
      min = minAge;
    }

    if (maxAge) {
      max = maxAge;
    }

    var ages = [];
    for (var i = min; i <= max; i++) {
      ages.push(i);
    }

    const newData = ages.map((item) => {
      let anzahlobj = {};
      keysliste.forEach((key) => {
        anzahlobj[key] = newDataset.filter(
          (i) => i.data[bereichsIndex] == key && i.data[altersIndex] == item
        ).length;
      });

      let vkobj = {};
      keysliste.forEach((key) => {
        vkobj[key] = newDataset
          .filter(
            (i) => i.data[bereichsIndex] == key && i.data[altersIndex] == item
          )
          .map((newItem) =>
            parseFloat(newItem.data[vkIndex].replace(",", "."))
          );
      });

      const arr = [];

      Object.values(vkobj).forEach((item) => item.map((i) => arr.push(i)));
      const lval = arr.reduce((a, b) => a + b, 0).toFixed(2);

      return {
        name: item,
        anzahl: anzahlobj,
        vk: vkobj,
        labelPosition: Object.values(anzahlobj).reduce((a, b) => a + b, 0),
        labelValue: lval == 0 ? null : lval,
      };
    });

    setData(newData);
    setResultVis(true);
  };

  const handleChange = (index) => (color) => {
    tableData[index][3] = color.rgb;
    setTableData([...tableData]);
  };

  const handleclick = (index) => () => {
    tableData[index][4] = !tableData[index][4];
    setTableData([...tableData]);
  };

  const handleClose = (index) => () => {
    tableData[index][4] = false;
    setTableData([...tableData]);
  };

  const reColor = (index) => () => {
    tableData[index][3] = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
      a: 1,
    };
    setTableData([...tableData]);
  };

  const TableInsert = tableData.map((item, index) => (
    <tr>
      {item.map((element, i) =>
        i == 3 ? (
          <td>
            <Button
              size="sm"
              style={{
                background: `rgba(${tableData[index][3].r},${tableData[index][3].g},${tableData[index][3].b},${tableData[index][3].a})`,
              }}
              onClick={handleclick(index)}
            >
              Choose
            </Button>
            {tableData[index][4] ? (
              <div style={{ position: "absolute", zIndex: "2" }}>
                <div
                  style={{
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                  }}
                  onClick={handleClose(index)}
                />
                <SketchPicker
                  name={"asdqwe"}
                  color={element}
                  asdqwe={i}
                  onChange={handleChange(`${index}`)}
                />
              </div>
            ) : null}
            <Button onClick={reColor(index)} className="ml-2" size="sm">
              <i className="fas fa-sync-alt"></i>
            </Button>
          </td>
        ) : i == 4 ? null : (
          <td>{element}</td>
        )
      )}
    </tr>
  ));

  const dlGraph = () => {
    const graph = document.querySelector(".recharts-surface");
    let svgURL = new XMLSerializer().serializeToString(graph);
    let svgBlob = new Blob([svgURL], { type: "image/svg+xml;charset=utf-8" });
    saveAs(svgBlob, "altersstruktur.svg");
  };

  useEffect(() => {
    if (dataset != null) {
      createData();
    }
  }, [graphheight, minAge, maxAge]);

  return (
    <>
      <h5 className="my-3">Click and Drag Upload</h5>
      <CSVReader
        className="mb-2"
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>

      <Form>
        <Form.Row controlId="exampleForm.SelectCustom">
          <Col>
            <Form.Label>Bereich</Form.Label>
            <Form.Control
              as="select"
              custom
              value={bereichCol}
              onChange={(e) => setBereichCol(e.target.value)}
            >
              {bereichsauswahl.map((item) => (
                <option>{item}</option>
              ))}
            </Form.Control>
          </Col>

          <Col controlId="exampleForm.SelectCustom">
            <Form.Label>Alter</Form.Label>
            <Form.Control
              as="select"
              custom
              value={alterCol}
              onChange={(e) => setAlterCol(e.target.value)}
            >
              {alterauswahl.map((item) => (
                <option>{item}</option>
              ))}
            </Form.Control>
          </Col>
          <Col controlId="exampleForm.SelectCustom">
            <Form.Label>VK</Form.Label>
            <Form.Control
              as="select"
              custom
              value={vkCol}
              onChange={(e) => setVkCol(e.target.value)}
            >
              {vkauswahl.map((item) => (
                <option>{item}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Row>
      </Form>

      <Button
        className="my-3"
        variant="info"
        size=""
        block
        disabled={bereichCol == "" && alterCol == "" && vkCol == ""}
        onClick={createData}
      >
        Proceed
      </Button>

      {resultVis ? (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Bereich</th>
                <th>Anzahl Mitarbeiter</th>
                <th>VK</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>{TableInsert}</tbody>
          </Table>

          <Row className="my-3">
            <Col>
              <Form.Control
                min="10"
                max="1000"
                placeholder="Graph Height"
                type="number"
                onChange={(e) => setGraphheight(parseInt(e.target.value))}
                value={graphheight}
              />
            </Col>
            <Col>
              <Form.Control
                min="0"
                max="100"
                placeholder="Font-Size VK in %"
                type="number"
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                value={fontSize}
              />
            </Col>

            <Col>
              <Form.Control
                value={minAge}
                onChange={(e) => setMinAge(parseInt(e.target.value))}
                placeholder="Min. Age"
                type="number"
              />
            </Col>
            <Col>
              <Form.Control
                value={maxAge}
                onChange={(e) => setmaxAge(e.target.value)}
                placeholder="Max. Age"
                type="number"
              />
            </Col>
            <Col>
              <Button variant="success" block onClick={dlGraph}>
                Download Graph
              </Button>
            </Col>
          </Row>

          <div style={{ height: `${graphheight}px`, width: "100%" }}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={"0%"}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  tickMargin={4}
                  padding={{ left: 10, right: 10 }}
                  dataKey="name"
                />
                <YAxis tickMargin={4} padding={{ bottom: 10 }} />
                {FillBars}
                {AnzahlBars}
                {MaskBars}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Personal;
