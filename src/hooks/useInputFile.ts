import * as React from 'react';

export function useInputFile(): [
  React.HookState<File | null>,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
] {
  const [file, setFile] = React.useState<File | null>(null);
  return [file, {
    type: "file",
    onChange: ({ target: { files } }) => setFile(files && files[0]),
  }];
}