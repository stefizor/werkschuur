(() => ({
  name: 'resource_gantt',
  icon: 'TitleIcon',
  category: 'CHARTS',
  structure: [
    {
      name: 'resource_gantt',
      options: [
        {
          value: '',
          label: 'Employee',
          key: 'employee',
          type: 'MODEL_AND_RELATION',
        },
        {
          value: {},
          label: 'Employee Filter',
          key: 'employee_filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'employee',
          },
        },
        {
          value: '',
          label: 'Project',
          key: 'project',
          type: 'MODEL_AND_RELATION',
        },
        {
          value: {},
          label: 'Project Filter',
          key: 'project_filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'project',
          },
        },
        {
          value: '',
          label: 'Project Resource',
          key: 'project_resource',
          type: 'MODEL_AND_RELATION',
        },
        {
          value: {},
          label: 'Project Resource Filter',
          key: 'project_resource_filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'project_resource',
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
