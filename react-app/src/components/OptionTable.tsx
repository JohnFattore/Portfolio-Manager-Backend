import { useEffect } from 'react';
import { getOptions } from './AxiosFunctions';
import { IOption } from '../interfaces';
import OptionRow from './OptionRow';
import Table from 'react-bootstrap/Table';

export default function OptionTable({ setMessage, options, selections, optionsDispatch, selectionsDispatch }) {

  let data: IOption[] = []
  useEffect(() => {
    if (options.length == 0) {
      getOptions()
        .then((response) => {
          data = response.data
          for (let i = 0; i < data.length; i++) {
            optionsDispatch({ type: "add", option: data[i] })
          }
        })
        .catch(() => {
          setMessage({ text: "Error", type: "error" })
        })
    }
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th scope="col" role="tickerHeader">Ticker</th>
          <th scope="col" role="sundayHeader">Beginning of Week [Sunday]</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option: IOption) =>
          <OptionRow option={option} selections={selections} selectionsDispatch={selectionsDispatch} setMessage={setMessage} />
        )}
      </tbody>
    </Table>
  );
}