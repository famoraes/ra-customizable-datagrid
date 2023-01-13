import React, { ChangeEvent, useCallback } from 'react';
import { FieldTitle } from 'react-admin';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Close as IconClose } from '@mui/icons-material';

type Props = {
  columns: Array<{
    label: string;
    source: string;
  }>;
  selection: Record<string, boolean>;
  onClose: () => void;
  resource: string;
  onColumnClicked: (columnName: string) => void;
};

const SelectionDialog = ({ columns, selection, onClose, resource, onColumnClicked }: Props) => {
  const handleClick = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onColumnClicked(event.target.value);
  }, []);

  return (
    <Dialog maxWidth="xs" aria-labelledby="ra-columns-dialog-title" onClose={onClose} open>
      <DialogTitle id="ra-columns-dialog-title">Configuration</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map(({ source, label }) => (
            <FormControlLabel
              key={source}
              control={
                <Checkbox
                  checked={!!selection[source]}
                  onChange={handleClick}
                  value={source}
                />
              }
              label={<FieldTitle label={label} source={source} resource={resource} />}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <IconClose />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectionDialog;

