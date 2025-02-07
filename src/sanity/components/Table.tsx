import ButtonsDash from './ButtonDash';
import { set, unset, useClient } from 'sanity';
import {
  Button,
  TextInput,
  Tooltip,
  Box,
  Stack,
  Flex,
  Card,
  Text,
} from '@sanity/ui';
import { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import {
  AiOutlineHolder,
  AiOutlineInsertRowRight,
  AiOutlineInsertRowBelow,
} from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdContentCopy } from 'react-icons/md';
import { RowType, OnChangeType, LocaleString, TableDocument } from './types';
import styles from './table.module.css';

type TableProps = {
  onChange: OnChangeType;
  value?: {
    title?: string;
    logo?: {
      asset?: {
        _ref: string;
      };
    };
    headers?: LocaleString[];
    rows?: RowType[];
  };
  type?: {
    title: string;
    name: string;
    fields: any[];
  };
};

export const generateKey = (prefix: string, index: number) => {
  return `${prefix}${index}`;
};

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export default function Table(props: TableProps) {
  const { onChange, value: savedValue } = props;
  const initialHeaders = [{ pl: '', en: '' }];
  const initialRows = [{ cells: [''] }];

  const [title, setTitle] = useState(savedValue?.title || '');
  const [headers, setHeaders] = useState<LocaleString[]>(
    savedValue?.headers || initialHeaders
  );
  const [rows, setRows] = useState<RowType[]>(savedValue?.rows || initialRows);

  const client = useClient();

  const updateSchema = (newValue: Partial<TableDocument>) => {
    const patches = Object.entries(newValue).map(([key, value]) =>
      set(value, [key])
    );
    onChange(patches);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(rows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRows(items);
    updateSchema({ rows: items });
  };

  const addColumn = () => {
    setHeaders([...headers, { pl: '', en: '' }]);
    const newRows = rows.map((row) => ({
      cells: [...row.cells, ''],
    }));
    setRows(newRows);
    updateSchema({ headers, rows: newRows });
  };

  const addRow = () => {
    const newRow = { cells: new Array(headers.length).fill('') };
    const newRows = [...rows, newRow];
    setRows(newRows);
    updateSchema({ rows: newRows });
  };

  const clearTable = () => {
    if (window.confirm('Are you sure you want to clear the table?')) {
      setRows(initialRows);
      setHeaders(initialHeaders);
      updateSchema({
        rows: initialRows,
        headers: initialHeaders,
      });
    }
  };

  const onFocusLost = (value: string, r: number, c: number) => {
    onChange([set(value, [`rows[${r}].cells[${c}]`])]);
  };

  const removeRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    updateSchema({ rows: newRows });
  };

  const removeColumn = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);

    const newRows = rows.map((row) => ({
      cells: row.cells.filter((_, cellIndex) => cellIndex !== index),
    }));
    setRows(newRows);

    updateSchema({
      headers: newHeaders,
      rows: newRows,
    });
  };

  const [cellValue, setCellValue] = useState('');
  const [currentCellIndex, setCellIndex] = useState(0);
  const [currentRowIndex, setRowIndex] = useState(0);
  const updateCellValue = (cv: string, ci: number, ri: number) => {
    setCellValue(cv);
    setCellIndex(ci);
    setRowIndex(ri);
  };

  const updateValue = (value: string, i: number, j: number) => {
    const stateCopy = deepClone(rows);
    stateCopy[i].cells[j] = value;
    setCellValue(value);
    setRows(stateCopy);
  };

  const duplicateRow = (index: number) => {
    const newRows = [...rows];
    const rowToDuplicate = deepClone(rows[index]);
    newRows.splice(index + 1, 0, rowToDuplicate);
    setRows(newRows);
    updateSchema({ rows: newRows });
  };

  const handleSelectImage = async () => {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const asset = await client.assets.upload('image', file);

      updateSchema({
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      });
    };

    input.click();
  };

  const removeLogo = () => {
    onChange([unset(['logo'])]);
  };

  return (
    <Stack space={4}>
      <Box>
        <Stack space={3}>
          <TextInput
            value={title}
            onChange={(e) => {
              const newTitle = e.currentTarget.value;
              setTitle(newTitle);
              updateSchema({ title: newTitle });
            }}
            placeholder="Table League Name"
          />

          <Flex gap={2}>
            <Button mode="ghost" onClick={handleSelectImage}>
              {savedValue?.logo?.asset?._ref ? 'Change Logo' : 'Add Logo'}
            </Button>

            {savedValue?.logo?.asset?._ref && (
              <Button mode="ghost" tone="critical" onClick={removeLogo}>
                Remove Logo
              </Button>
            )}
          </Flex>

          {savedValue?.logo?.asset?._ref && (
            <Box>
              <Text size={1}>Logo selected</Text>
            </Box>
          )}
        </Stack>
      </Box>

      <Box>
        <div className={styles.importantBox}>
          <h6>!!! Important !!!</h6>
          <p>
            - Please start by creating the titles of the columns in the table in
            English and Polish.
          </p>
          <p>
            -- The column with the position of the team in the table is created
            automatically
          </p>
          <p>
            --- In order to display the tables correctly on the website we need
            to have a column called Punkty/Points or Mecze/Matchs, if in some
            league the column is called Pkt/Pts or M (as a match) then here we
            need to create it as Punkty/Points or Mecze/Matchs
          </p>
        </div>
      </Box>

      <div className={styles.columnsContainer}>
        <div className={styles.columnsWrapper}>
          {headers.map((header, index) => (
            <Card key={index} padding={2} className={styles.columnCard}>
              <Stack space={2}>
                <Box>
                  <Button
                    mode="bleed"
                    tone="critical"
                    onClick={() => removeColumn(index)}
                    disabled={headers.length <= 1}
                  >
                    <Tooltip content="Delete column" placement="top">
                      <BsTrash />
                    </Tooltip>
                  </Button>
                </Box>
                <TextInput
                  value={header.pl}
                  onChange={(e) => {
                    const newHeaders = [...headers];
                    newHeaders[index] = {
                      ...header,
                      pl: e.currentTarget.value,
                    };
                    setHeaders(newHeaders);
                    updateSchema({ headers: newHeaders });
                  }}
                  placeholder="Tytuł kolumny (PL)"
                />
                <TextInput
                  value={header.en}
                  onChange={(e) => {
                    const newHeaders = [...headers];
                    newHeaders[index] = {
                      ...header,
                      en: e.currentTarget.value,
                    };
                    setHeaders(newHeaders);
                    updateSchema({ headers: newHeaders });
                  }}
                  placeholder="Column title (EN)"
                />
              </Stack>
            </Card>
          ))}
        </div>
      </div>

      <Box className={styles.boxButtons}>
        <ButtonsDash
          buttons={[
            {
              description: 'Add column',
              icon: <AiOutlineInsertRowRight />,
              onClick: addColumn,
            },
            {
              description: 'Add row',
              icon: <AiOutlineInsertRowBelow />,
              onClick: addRow,
            },
            {
              description: 'Delete table',
              icon: <RiDeleteBin6Line />,
              onClick: clearTable,
              tone: 'critical',
            },
          ]}
        />
      </Box>

      <div className={styles.userCreateTableContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="droppable-table">
            {(provided) => (
              <Card ref={provided.innerRef} {...provided.droppableProps}>
                <Stack space={2}>
                  <Flex align="center">
                    <Box padding={2} style={{ width: '24px' }}>
                      <Flex align="center" gap={2}>
                        <Text size={1} muted></Text>
                      </Flex>
                    </Box>
                    <Flex flex={1} gap={2} align="center">
                      {headers.map((header, index) => (
                        <Box
                          key={`header-${index}`}
                          flex={1}
                          className={styles.tableCell}
                        >
                          <Text
                            size={1}
                            muted
                            align="center"
                            className={styles.userCreateTableHeaderCell}
                          >
                            {header.pl}
                          </Text>
                        </Box>
                      ))}
                    </Flex>
                  </Flex>

                  {rows.map((row, rowIndex) => {
                    const dragId = `row-${rowIndex}`;
                    return (
                      <Draggable
                        key={dragId}
                        draggableId={dragId}
                        index={rowIndex}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            shadow={snapshot.isDragging ? 1 : 0}
                            radius={2}
                          >
                            <Flex align="center">
                              <Box padding={2} {...provided.dragHandleProps}>
                                <Flex align="center" gap={2}>
                                  <Text size={1} weight="semibold">
                                    {rowIndex + 1}.
                                  </Text>
                                  <AiOutlineHolder />
                                </Flex>
                              </Box>
                              <Flex flex={1} gap={2} align="center">
                                {row.cells.map((cell, cellIndex) => (
                                  <Box
                                    key={generateKey('cell', cellIndex)}
                                    flex={1}
                                    className={styles.tableCell}
                                  >
                                    <TextInput
                                      value={cell}
                                      onChange={(event) =>
                                        updateValue(
                                          event.currentTarget.value,
                                          rowIndex,
                                          cellIndex
                                        )
                                      }
                                      onBlur={(event) =>
                                        onFocusLost(
                                          event.currentTarget.value,
                                          rowIndex,
                                          cellIndex
                                        )
                                      }
                                      onFocus={(event) =>
                                        updateCellValue(
                                          event.currentTarget.value,
                                          cellIndex,
                                          rowIndex
                                        )
                                      }
                                    />
                                  </Box>
                                ))}
                                {rows.length > 1 && (
                                  <Box padding={2}>
                                    <Flex gap={2} align="center">
                                      <Button
                                        mode="bleed"
                                        tone="positive"
                                        onClick={() => duplicateRow(rowIndex)}
                                      >
                                        <Tooltip
                                          content="Duplicate row"
                                          placement="top"
                                        >
                                          <MdContentCopy />
                                        </Tooltip>
                                      </Button>
                                      <Button
                                        mode="bleed"
                                        tone="critical"
                                        onClick={() => removeRow(rowIndex)}
                                      >
                                        <Tooltip
                                          content="Delete row item"
                                          placement="top"
                                        >
                                          <BsTrash />
                                        </Tooltip>
                                      </Button>
                                    </Flex>
                                  </Box>
                                )}
                              </Flex>
                            </Flex>
                          </Card>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Stack>
              </Card>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </Stack>
  );
}
