import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, message } from 'antd'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DropOption } from '../../components'
import { formatMib } from '../../utils/formater'
import { sortTable } from '../../utils/sort'
import { setSortOrder } from '../../utils/store'

const confirm = Modal.confirm

const BackupUrl = ({ url = '' }) => {
  const onCopy = (text, copySuccess) => { // eslint-disable-line no-unused-vars
    if (copySuccess) {
      message.success('Copyed', 1.5)
    } else {
      message.error('Copy failed', 1.5)
    }
  }

  return (
    <div>
      <h3> Backup URL: </h3>
      <p style={{ marginTop: 20, marginLeft: -40, fontSize: '1.2em' }}>
        {url}
        {
          url ? <CopyToClipboard onCopy={onCopy} text={url}>
            <Icon
              className="color-link"
              style={{ marginLeft: 5, fontSize: '1.2em', cursor: 'pointer' }}
              type="copy"
            />
          </CopyToClipboard> : 'URL no available'
        }
      </p>
    </div>
  )
}

BackupUrl.propTypes = {
  url: PropTypes.string,
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 300,
    }
  }

  componentDidMount() {
    let height = document.getElementById('backDetailTable').offsetHeight - 72
    this.setState({
      height,
    })
    window.onresize = () => {
      height = document.getElementById('backDetailTable').offsetHeight - 72
      this.setState({
        height,
      })
    }
  }

  componentWillUnmount() {
    window.onresize = null
  }

  render() {
    const { backup, loading, showRestoreBackup, showBackupLabels, deleteBackup, sorter, onSorterChange = f => f } = this.props
    const dataSource = backup || []
    const handleMenuClick = (record, event) => {
      switch (event.key) {
        case 'restore':
          showRestoreBackup(record)
          break
        case 'delete':
          confirm({
            title: `Are you sure you want to delete backup ${record.name} ?`,
            onOk() {
              deleteBackup(record)
            },
          })
          break
        case 'getUrl':
          Modal.info({
            width: '600',
            content: <BackupUrl url={record.url} />,
          })
          break
        default:
      }
    }

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 300,
        sorter: (a, b) => sortTable(a, b, 'id'),
      }, {
        title: 'Volume',
        dataIndex: 'volumeName',
        key: 'volumeName',
        width: 200,
      }, {
        title: 'Snapshot Name',
        dataIndex: 'snapshotName',
        key: 'snapshotName',
        align: 'center',
        width: 300,
        sorter: (a, b) => sortTable(a, b, 'snapshotName'),
      }, {
        title: 'Base Image',
        width: 180,
        dataIndex: 'labels.ranchervm-base-image',
        key: 'baseImage',
        render: (text) => {
          return (
            <div>
              {text}
            </div>
          )
        },
      }, {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        width: 120,
        sorter: (a, b) => sortTable(a, b, 'size'),
        render: (text) => {
          return (
            <div>
              {formatMib(text)}
            </div>
          )
        },
      }, {
        title: 'SnapshotCreated',
        dataIndex: 'snapshotCreated',
        key: 'snapshotCreated',
        width: 220,
        sorter: (a, b) => sortTable(a, b, 'snapshotCreated'),
        render: (text) => {
          return (
            <div>
              {moment(new Date(text)).fromNow()}
            </div>
          )
        },
      }, {
        title: 'Labels',
        dataIndex: 'labels',
        key: 'labels',
        width: 120,
        render: (obj) => {
          return (
            <div onClick={() => { showBackupLabels(obj) }}>
              <Icon style={{ fontSize: '18px', color: obj ? '#108eb9' : '#cccccc', cursor: 'pointer' }} type="tags" />
            </div>
          )
        },
      }, {
        title: 'Operation',
        key: 'operation',
        width: 100,
        render: (text, record) => {
          return (
            <DropOption menuOptions={[
              { key: 'delete', name: 'Delete' },
              { key: 'restore', name: 'Restore' },
              { key: 'getUrl', name: 'Get URL' },
            ]}
              onMenuClick={e => handleMenuClick(record, e)}
            />
          )
        },
      },
    ]

    const pagination = false
    const onChange = (p, f, s) => {
      onSorterChange(s)
    }
    setSortOrder(columns, sorter)
    const locale = {
      emptyText: backup ? 'No Data' : 'Please select a volume first',
    }

    return (
      <div id="backDetailTable" style={{ overflow: 'hidden', flex: 1 }}>
        <Table
          locale={locale}
          bordered={false}
          columns={columns}
          onChange={onChange}
          loading={loading}
          dataSource={dataSource}
          simple
          pagination={pagination}
          rowKey={record => record.id}
          scroll={{ x: 1540, y: this.state.height }}
        />
      </div>
    )
  }
}

List.propTypes = {
  backup: PropTypes.array,
  showRestoreBackup: PropTypes.func,
  deleteBackup: PropTypes.func,
  loading: PropTypes.bool,
  sorter: PropTypes.object,
  onSorterChange: PropTypes.func,
  showBackupLabels: PropTypes.func,
}

export default List
