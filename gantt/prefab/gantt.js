(() => ({
  name: 'gantt',
  icon: 'TitleIcon',
  category: 'CHARTS',
  structure: [
    {
      name: 'gantt',
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL_AND_RELATION',
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          type: 'TEXT',
          label: 'Task Info',
          key: 'task_info',
          value: '',
        },
        {
          type: 'TOGGLE',
          label: 'Hide Task Date',
          key: 'hideTaskDate',
          value: true
        },
        {
          type: 'CUSTOM',
          label: 'View Mode',
          key: 'viewMode',
          value: 'day',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Day',
                value: 'day'
              },
              {
                name: 'Week',
                value: 'week'
              },
              {
                name: 'Month',
                value: 'month'
              }
            ]
          }
        },
      ],
      descendants: [],
    },
  ],
}))();
