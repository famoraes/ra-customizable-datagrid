<h1 align="center">ra-customizable-datagrid for <a rel="noopener" target="_blank" href="https://github.com/marmelab/react-admin/">React Admin</a></h1>

<div align="center">

[React Admin](https://github.com/marmelab/react-admin/) plugin that allows to hide / show columns dynamically.

</div>

## Based on [fizix-io/ra-customizable-datagrid](https://github.com/fizix-io/ra-customizable-datagrid)
Project was moved to TypeScript and dependencies was updated.

## Features

* Users can show/hide columns, obviously
* Users preferences are stored by resource
* The storage mechanism can be replaced
* Developers can choose the default visible columns

## Installation

ra-customizable-datagrid is available from npm. You can install it (and its required dependencies) using:

```
$> npm install --save react-admin-customizable-datagrid
```
or
```
$> yarn add react-admin-customizable-datagrid
```

Then replace React Admin `Datagrid` by `CustomizableDatagrid`

```jsx
import CustomizableDatagrid from 'ra-customizable-datagrid';

const PostList = () => (
  <List>
    <CustomizableDatagrid>
      <TextField source="id" />
      <TextField source="title" />
    </CustomizableDatagrid>
  </List>
);
```

## Configuration

### Default columns

All the columns are visible by default.

This behavior can be changed with the `defaultColumns` prop. Just pass an array containing the name of the columns you want to be visible.

```jsx
import CustomizableDatagrid from 'ra-customizable-datagrid';

const PostList = props => (
  <List {...props}>
    <CustomizableDatagrid defaultColumns={['title']}>
      <TextField source="id" />
      <TextField source="title" />
    </CustomizableDatagrid>
  </List>
);
```

## License

`ra-customizable-datagrid` is licensed under the MIT License, sponsored and supported by <a href="https://fizix.io/" rel="noopener" target="_blank">Fizix</a>.
