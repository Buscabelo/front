import React from 'react';
import { LineChart } from "@opd/g2plot-react";
import { ConsoleSqlOutlined } from '@ant-design/icons';

export default function Graph({data}) {

  const config = {
    padding: "auto",
    autoFit: true,
    data: data,
    xField: "date",
    yField: "value",
    smooth: true,
    seriesField: "category",
    meta: {
      date: {
        alias: "Data"
      },
      value: {
        alias: "Value"
      }
    }
  };

  return (
    <LineChart {...config} />
  )
}
