import { EntityID } from '@atticusofsparta/arfs-lite-client';
import * as Popover from '@radix-ui/react-popover';
import Pagination from 'rc-pagination';
import Table from 'rc-table';
import { useEffect, useState } from 'react';

import useFilesTable from '../../../hooks/useFilesTable/useFilesTable';
import ArFSDrive from '../../../services/ArFSDrive';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import { ChevronDownIcon } from '../../icons';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import FileDetails from './FileDetails/FileDetails';
import './styles.css';

function Files({
  drive,
  loadingDrive,
  loadPercentage,
  startFolder,
}: {
  drive?: ArFSDrive;
  loadingDrive?: boolean;
  loadPercentage?: number;
  startFolder?: EntityID;
}) {
  const { rows, columns, expandRow, expandedRowKey } = useFilesTable(drive);
  const [fileData, setFileData] = useState<any[]>([]);
  const [fileColumns, setFileColumns] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState<EntityID | undefined>(
    startFolder,
  );
  const [drivePath, setDrivePath] = useState<EntityID[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (drive && !currentFolder) {
      setCurrentFolder(
        new EntityID(drive._driveEntity.rootFolderId.toString()),
      );
    }
    setFileData(updateRows(rows));
    setFileColumns(columns);
    setDrivePath(currentFolder ? updateDrivePath(currentFolder) : []);

  }, [rows, currentFolder, startFolder]);

  function updateRows(rows: any[]) {
    const filteredRows = rows.filter((row) => {
      if (row.entityType === 'folder' && row.folderId) {
        
      }
      const parentFolderId = row.parentFolderId?.entityId?.toString();
      if (parentFolderId === 'root folder') {
        return false;
      }
      if (currentFolder === drive?._driveEntity.rootFolderId.toString()) {
        return true;
      }
      return parentFolderId === currentFolder?.toString();
    });
    console.log(filteredRows);

    return filteredRows;
  }

  function getParentOfParentFolder(parentFolderId?: EntityID) {
    if (startFolder?.toString() === parentFolderId?.toString()) {
      return;
    }
    if (!parentFolderId || parentFolderId.toString() === 'root folder') {
      return;
    }
    const parentOfParentFolder = drive?._folderEntities.find((folder) => {
      return folder.entityId.toString() === parentFolderId.toString();
    })?.parentFolderId;

    return parentOfParentFolder;
  }

  function updateDrivePath(id: EntityID) {
    let newPaths = [id];
    let parent = '';
    while (parent !== 'root folder') {
      parent =
        getParentOfParentFolder(newPaths[newPaths.length - 1])?.toString() ??
        'root folder';
      if (parent === 'root folder') {
        continue;
      }
      newPaths.push(new EntityID(parent.toString()));
    }

    return newPaths.reverse();
  }

  function getNameForId(id: EntityID) {

    const entity = drive?._folderEntities.find((folder) => {
      return JSON.parse(JSON.stringify(folder.entityId)).entityId === id?.toString();
    });
    console.log(entity, id)
    return entity?.name;
  }

  function PathPopup({ paths }: { paths: EntityID[] }) {
    const [opened, setOpened] = useState(false);

    return (
      <Popover.Root open={opened}>
        <Popover.Trigger
          asChild
          onPointerEnter={() => (paths.length > 1 ? setOpened(true) : null)}
        >
          <span>{getNameForId(startFolder ? startFolder : paths[0])}</span>
        </Popover.Trigger>
        <Popover.Content
          className="flex-column radius"
          style={{
            width: 'fit-content',
            maxWidth: '300px',
            zIndex: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
            background: 'var(--background-dark-theme)',
            color: 'var(--text-dark-theme)',
            boxShadow: 'var(--shadow)',
            padding: '10px',
          }}
          onPointerLeave={() => setOpened(false)}
        >
          {paths.map((path, index) => {
            if (path === currentFolder) {
              return;
            }
            return (
              <button
                className="button white hover"
                style={{
                  padding: '3px',
                  borderRadius: '3px',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
                key={index}
                onClick={() => setCurrentFolder(path)}
              >
                {path.toString() !== 'root folder'
                  ? getNameForId(path)
                  : 'root'}
              </button>
            );
          })}
        </Popover.Content>
      </Popover.Root>
    );
  }

  if (loadingDrive) {
    return (
      <div
        className="flex-column center"
        style={{
          height: '100%',
          marginTop: '-75%',
          marginLeft: '70px',
          marginRight: 'auto',
          position: 'absolute',
        }}
      >
        <span
          className="textLarge white"
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: '100px',
          }}
        >
          Loading Drive...
          {/*TODO: setup cache interaction listener to calculate loading percentage
           <br />
          <br />
          {loadPercentage ?? 0}% */}
        </span>
        <CircleProgressBar size={250} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div
      className="flex-column"
      style={{
        position: 'relative',
        height: '350px',
        width: '100%',
        justifyContent: 'flex-end',
      }}
    >
      {/* Bread crumb nav */}
      <div
        className="flex-row"
        style={{
          width: '100%',
          background: 'transparent',
          height: '40px',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: '-40px',
        }}
      >
        <span className="textMedium white">
          <PathPopup paths={drivePath ?? []} />
          {currentFolder?.toString() !==
          drive?._driveEntity.rootFolderId.toString()
            ? ' / ' +
              getNameForId(
                currentFolder ??
                  new EntityID(drive?._driveEntity.rootFolderId.entityId),
              )
            : ''}
        </span>
        <Pagination
          pageSize={10}
          total={fileData.length}
          current={page}
          onChange={(page) => setPage(page)}
          prevIcon={
            <ChevronDownIcon
              width={10}
              height={10}
              style={{ transform: 'rotate(90deg)' }}
            />
          }
          nextIcon={
            <ChevronDownIcon
              width={10}
              height={10}
              style={{ transform: 'rotate(-90deg)' }}
            />
          }
          style={{ display: 'flex', flexDirection: 'row' }}
          showPrevNextJumpers
          hideOnSinglePage
          itemRender={(page, type, originalElement) => {
            if (type === 'jump-prev' || type === 'jump-next') {
              return (
                <button
                  className="button white"
                  style={{ width: '15px', height: '15px', border: 'none' }}
                >
                  . . .
                </button>
              );
            }

            return originalElement;
          }}
        />
      </div>
      <div
        className="fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          justifyContent: 'center',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <ScrollContainer
          scrollBarContainerStyle={
            fileData.length > 4 ? { top: '70px' } : { display: 'none' }
          }
          scrollBarContainerHeight={260}
        >
          <Table
            columns={fileColumns}
            data={fileData}
            prefixCls="files-table"
            rowClassName="files-table-row"
            tableLayout="auto"
            expandable={{
              rowExpandable: () => true,
              expandRowByClick: true,
              expandedRowKeys: [expandedRowKey ?? ''],
              expandedRowRender: (record) => <FileDetails row={record} />,
            }}
            onRow={(record) => ({
              onClick: () => {
                if (record.entityType === 'folder') {
                  setCurrentFolder(
                    new EntityID(record.entityId.entityId.toString()),
                  );
                  return;
                }
                expandRow(record);
              },
            })}
            emptyText={
              <div
                className="flex-column white textLarge center"
                style={{
                  width: '100%',
                  height: '100%',
                  marginTop: '60px',
                  gap: '40px',
                }}
              >
                No files found.
                <span className="textMedium">
                  Try importing a drive, folder, or file on the import screen.
                </span>
              </div>
            }
          />
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Files;
