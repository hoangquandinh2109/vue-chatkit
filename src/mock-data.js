export const users = [
  {
    username: 'quan',
    name: 'Dinh Hoang Quan',
    rooms: [
      {
        id: 1,
        name: 'UberYTE',
      },
      {
        id: 2,
        name: 'EthxKl',
      },
    ],
  },
  {
    username: 'yen',
    name: 'Nguyen Xuan Yen',
    rooms: [
      {
        id: 1,
        name: 'UberYTE',
      },
      {
        id: 2,
        name: 'EthxKl',
      },
    ],
  },
  {
    username: 'tuan',
    name: 'Quach Anh Tuan',
    rooms: [
      {
        id: 1,
        name: 'UberYTE',
      },
    ],
  },
  {
    username: 'minh',
    name: 'Tran Cong Minh',
    rooms: [
      {
        id: 1,
        name: 'UberYTE',
      },
    ],
  },
  {
    username: 'thang',
    name: 'Nguyen Van Thang',
    rooms: [
      {
        id: 1,
        name: 'UberYTE',
      },
    ],
  },
]

export const rooms = [
  {
    id: 1,
    name: 'UberYTE',
    users: [
      {
        username: 'quan',
        name: 'Dinh Hoang Quan',
        presence: {
          state: 'offline',
        },
      },
      {
        username: 'yen',
        name: 'Nguyen Xuan Yen',
        presence: {
          state: 'offline',
        },
      },
      {
        username: 'tuan',
        name: 'Quach Anh Tuan',
        presence: {
          state: 'offline',
        },
      },
      {
        username: 'minh',
        name: 'Tran Cong Minh',
        presence: {
          state: 'offline',
        },
      },
      {
        username: 'thang',
        name: 'Nguyen Van Thang',
        presence: {
          state: 'offline',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'EthxKl',
    users: [
      {
        username: 'quan',
        name: 'Dinh Hoang Quan',
        presence: {
          state: 'offline',
        },
      },
      {
        username: 'yen',
        name: 'Nguyen Xuan Yen',
        presence: {
          state: 'offline',
        },
      },
    ],
  },
]
