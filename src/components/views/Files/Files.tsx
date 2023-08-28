import { ArFSPublicFolder, EntityID } from '@atticusofsparta/arfs-lite-client';
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
  // loadPercentage,
  startFolder,
  fullScreen
}: {
  fullScreen: boolean;
  drive?: ArFSDrive;
  loadingDrive?: boolean;
  loadPercentage?: number;
  startFolder?: EntityID;
}) {
  const { rows, columns, expandRow, expandedRowKey } = useFilesTable(drive);
  const [fileData, setFileData] = useState<any[]>([]);
  const [paginatedFileData, setPaginatedFileData] = useState<any[]>([]);
  const [fileColumns, setFileColumns] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState<EntityID | undefined>(
    startFolder,
  );
  const [drivePath, setDrivePath] = useState<EntityID[]>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);

  useEffect(() => {
    if (drive && !currentFolder) {
      // TODO: fix loading for file only drives here. Need to add parent folder logic as startFolder.
      setCurrentFolder(new EntityID(drive._driveEntity.rootFolderId.entityId));
    }

    setFileData(updateRows(rows));
    setFileColumns(columns);
    setDrivePath(currentFolder ? updateDrivePath(currentFolder) : []);
    updatePages(1);
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

    return filteredRows;
  }

  function getParentOfParentFolder(parentFolderId?: EntityID) {
    if (startFolder && startFolder.toString() === parentFolderId?.toString()) {
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
    const entity = drive?._folderEntities.find((folder: ArFSPublicFolder) => {
      // TODO: this is a bug with loading folders vs drives. Clean works for drives, dirty for folders. Fix this disgusting code when possible.
      const cleanResult = folder.entityId.toString() === id?.toString();
      if (cleanResult) return cleanResult;
      const dirtyResult = folder.entityId.toString() === id?.toString();
      return dirtyResult;
    });
    return entity?.name;
  }

  function updatePages(pageNumber: number) {
    setPage(pageNumber);
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedFileData(updateRows(rows).slice(start, end));
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
          Loading Files...
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
        height: fullScreen ? window.innerHeight - window.innerHeight * .25 : '350px',
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
              getNameForId(currentFolder ?? drive?._driveEntity.rootFolderId)
            : ''}
        </span>
        <Pagination
          pageSize={itemsPerPage}
          total={fileData.length}
          current={page}
          onChange={(page) => updatePages(page)}
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
            paginatedFileData.length > 4 ? { top: '70px' } : { display: 'none' }
          }
          scrollBarContainerHeight={fullScreen ? window.innerHeight * .65 : 260}
        >
          <Table
            columns={fileColumns}
            data={paginatedFileData}
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
                  setCurrentFolder(record.entityId);
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
