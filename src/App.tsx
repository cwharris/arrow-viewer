import * as React from 'react';
import * as Arrow from 'apache-arrow';
import * as ReactVirtualized from 'react-virtualized';

import { useWindowSize } from './hooks/useWindowSize';
import { useArrowTableFromFileInput } from './hooks/useArrowTable';

export function App() {

  const [size] = useWindowSize();
  const [table, fileInput] = useArrowTableFromFileInput();

  return (
    table
      ? <ArrowTableGrid {...size} table={table} />
      : <input {...fileInput}></input>
  );
}

function ArrowTableGrid({ table, width, height }: { table: Arrow.Table, width: number, height: number }): JSX.Element {

  function cellRenderer({ key, style, columnIndex, rowIndex }: ReactVirtualized.GridCellProps): React.ReactNode {
    return <div key={key} style={style}>
      <div style={{ padding: 20 }}>
        {`${table.get(columnIndex).get(rowIndex)}` }
      </div>
    </div>
  }

  const props = {
    cellRenderer,
    width: width,
    height: height,
    columnWidth: 400,
    columnCount: table.numCols,
    rowHeight: 100,
    rowCount: table.length
  };

  return (
    <ReactVirtualized.Grid {...props} />
  );
}