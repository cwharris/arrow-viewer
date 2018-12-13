import * as React from 'react';
import * as Arrow from 'apache-arrow';
import { valueToString } from 'apache-arrow/util/pretty';

import * as ReactVirtualized from 'react-virtualized';
import { Table, Column, AutoSizer } from 'react-virtualized';

import 'react-virtualized/styles.css';
import { useWindowSize } from './hooks/useWindowSize';
import { useArrowTableFromFileInput } from './hooks/useArrowTable';
import { defaultRowRenderer } from 'react-virtualized/dist/es/Table';

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

  const rowGetter = ({ index }: ReactVirtualized.Index) => table.get(index);
  const cellRenderer = ({ cellData }: ReactVirtualized.TableCellProps) => valueToString(cellData);
  const headerRenderer = ({ label }: ReactVirtualized.TableHeaderProps) => label;
  const rowRenderer = (props: ReactVirtualized.TableRowProps) => defaultRowRenderer({
    ...props, style: { ...props.style, width: props.style.width - 15 }
  });
  const headerRowRenderer = ({ className, columns, style }: ReactVirtualized.TableHeaderRowProps) => (
    <div role='row' className={className} style={{ ...style, ...headerStyle(), width: width - 15 }}>
      {columns}
    </div>
  );

  return (
    <AutoSizer disableHeight>
      {(size) => (
      <Table
        {...size}
        height={height - 4}
        rowGetter={rowGetter}
        rowHeight={28}
        headerHeight={25}
        rowStyle={rowStyle}
        rowCount={table.length}
        rowRenderer={rowRenderer}
        headerStyle={headerStyle()}
        headerRowRenderer={headerRowRenderer}
        >
        {table.schema.fields.map((field, idx) => (
          <Column
            width={25}
            minWidth={25}
            flexGrow={1}
            dataKey={idx}
            label={`${field}`}
            cellRenderer={cellRenderer}
            headerRenderer={headerRenderer}
            />
        ))}
      </Table>
      )}
      </AutoSizer>
    );
}

const headerStyle = () => ({ textAlign: 'right', textTransform: 'none' }) as React.CSSProperties;

const rowStyle = ({ index }: ReactVirtualized.Index) => index % 2 === 0
  ? ({ ...headerStyle(), borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' })
  : ({ ...headerStyle(), borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa' });
