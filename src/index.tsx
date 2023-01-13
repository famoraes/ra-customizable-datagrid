import React, { ReactNode, useState, useEffect, Children, useCallback } from 'react';
import { Datagrid } from 'react-admin';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { ViewColumn as ColumnIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';

import SelectionDialog from './SelectionDialog';
import { setValueInLocalStorage, getValueFromLocalStorage } from './utils';

type Props = {
  children: ReactNode;
  defaultColumns: string[];
  resource: string;
} & React.ComponentProps<typeof Datagrid>;

const arrayToSelection = (values: string[]): Record<string, boolean> =>
  values.reduce((selection: Record<string, boolean>, columnName) => {
    selection[columnName] = true;
    return selection;
  }, {});

const CustomizableDatagrid = ({ children, defaultColumns, resource, ...rest }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const toggleColumn = useCallback(
    (columnName: string) => {
      setSelection((prevState) => ({
        ...prevState,
        [columnName]: !prevState[columnName] ?? false,
      }));
    },
    [selection],
  );
  const getColumnLabels = useCallback(
    () =>
      filter(
        React.Children.map(
          children,
          (field) =>
            field && {
              source: get(field, ['props', 'source']),
              label: get(field, ['props', 'label']),
            },
        ),
        (item) => item && item.source,
      ),
    [children],
  );
  const renderChild = useCallback((child: ReactNode) => {
    const source = get(child, ['props', 'source']);

    if (!source || !selection[source]) {
      return React.cloneElement(child, {});
    }

    return null;
  }, []);

  useEffect(() => {
    setValueInLocalStorage(resource, selection);
  }, [selection]);

  useEffect(() => {
    const columnNames = Children.map(children, (field) => get(field, ['props', 'source']));
    const previousSelection = getValueFromLocalStorage(resource);

    if (!isEmpty(previousSelection)) {
      setSelection(previousSelection);
      return;
    }

    if (!isEmpty(defaultColumns)) {
      setSelection(arrayToSelection(defaultColumns));
      return;
    }

    setSelection(arrayToSelection(columnNames));
  }, []);

  return (
    <div>
      <div style={{ float: 'right', marginRight: '1rem' }}>
        <Button
          variant="outlined"
          size="small"
          aria-label="add"
          onClick={() => setModalOpened(true)}
        >
          <ColumnIcon />
        </Button>
      </div>
      {modalOpened && (
        <SelectionDialog
          selection={selection}
          columns={getColumnLabels()}
          onColumnClicked={toggleColumn}
          onClose={() => setModalOpened(false)}
          resource={resource}
        />
      )}
      <Datagrid {...rest}>{React.Children.map(children, renderChild)}</Datagrid>
    </div>
  );
};

export default CustomizableDatagrid;
