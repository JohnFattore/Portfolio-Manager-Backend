import { useEffect } from 'react';
import { getOptions, getSelections } from './axiosFunctions';
import { IOption, ISelection } from '../interfaces';
import OptionSelectionRow from './OptionSelectionRow';
import Table from 'react-bootstrap/Table';

export default function OptionSelectionTable({setMessage, options, selections, optionsDispatch, selectionsDispatch, week}) {
  
    let data: ISelection[] = []
    let optionData: IOption[] = []
    useEffect(() => {
        if (selections.length == 0) {
            getSelections(week)
                .then((response) => {
                    data = response.data
                    for (let i = 0; i < data.length; i++) {
                        selectionsDispatch({ type: "add", selection: data[i] })
                    }
                })
                .catch(() => {
                    setMessage({ text: "Error", type: "error" })
                })
        }

        if (options.length == 0) {
          getOptions(week)
            .then((response) => {
                optionData = response.data
              for (let i = 0; i < optionData.length; i++) {
                optionsDispatch({ type: "add", option: optionData[i] })
              }
            })
            .catch(() => {
              setMessage({ text: "Error", type: "error" })
            })
        }
    }, []);

    if (selections.length == 0) {
        return (<h3 role="noSelections">You haven't made any selections for this week</h3>)
    }

  if (options.length == 0) {
    return (<h3 role="noOptions">There are no options for this week</h3>)
  }
 
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col" role="optionSelectionTickerHeader">Ticker</th>
          <th scope="col" role="optionSelectionSundayHeader">Beginning of Week [Sunday]</th>
          <th scope="col" role="optionSelectionPriceHeader">Current Price</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option: IOption) =>
          <OptionSelectionRow option={option} selections={selections} setMessage={setMessage} key={option.id}/>
        )}
      </tbody>
    </Table>
  );
}