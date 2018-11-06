import * as React from 'react';
import * as Arrow from 'apache-arrow';

import { useInputFile } from './useInputFile';

export function useArrowTableFromFileInput(): [
   React.HookState<Arrow.Table | null>,
   React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
] {
  var [file, fileInput] = useInputFile();
  var [arrowTable] = useArrowTableFromFile(file);
  return [arrowTable, fileInput];
}

export function useArrowTableFromFile(file: File | null): [
  React.HookState<Arrow.Table | null>
] {
  const [table, setTable] = React.useState<Arrow.Table | null>(null);
  const fileReader = React.useMemo(() => {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const array = new Uint8Array((event.target as any).result);
      const table = Arrow.Table.from([array])
      setTable(table);
    };
    return fileReader;
  }, []);

  React.useEffect(function readAndSetTable() {
    if (file) {
      fileReader.readAsArrayBuffer(file);
    }
    else {
      setTable(null);
    }
  }, [file]);

  return [table];
}