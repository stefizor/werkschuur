(() => ({
  name: 'resource_gantt',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'Ganttmodule',
      package: 'npm:gantt-task-react@latest',
      imports: ['*'],
    },
  ],
  jsx: (() => {
    const {
      Ganttmodule: { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption },
    } = dependencies
    // // Hier worden de functies die we nodig hebben voor deze component van Betty geimporteerd uit het B-object.
    const { env, useFilter, useOneQuery, useAllQuery, GetOne, useRelation } = B;
    const isDev = env === 'dev';

    // Hier worden alle opties uit de prefab binnengehaald.
    const {
      model,
      filter,
      task_info,
      hideTaskDate,
      viewMode,
    } = options;

    var view = ViewMode.Day;
    switch(viewMode){
      case "day":
        view = ViewMode.Day;
        break;
      case "week":
        view = ViewMode.Week;
        break;
      case "month":
        view = ViewMode.Month;
        break;
      }

    let columnWidth = 65;
    if (view === ViewMode.Year) {
      columnWidth = 350;
    } else if (view === ViewMode.Month) {
      columnWidth = 300;
    } else if (view === ViewMode.Week) {
      columnWidth = 250;
    }

    // In preview hebben we geen data dus laten we een stock task zien
    if(isDev){
      let tasks = [
        {
          start: new Date(2023, 1, 1),
          end: new Date(2023, 1, 2),
          name: 'Idea',
          id: 'Task 0',
          type: 'task',
          progress: 45,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
      ];

      return (<div class={hideTaskDate ? 'disable-task-dates' : ''}>
        <Gantt tasks={tasks}
        viewMode={view}
        columnWidth={columnWidth}
        listCellWidth={task_info} />
        </div>)
    }
    //needed for copy
    var where = useFilter(filter);
    //copied from datatable.js
    const {
      loading: queryLoading,
      error,
      data: queryData,
      refetch,
    } = useAllQuery(
      model,
      {
        rawFilter: where,
        // variables,
        // skip: loadOnScroll ? skip : page * rowsPerPage,
        // take: loadOnScroll ? autoLoadTakeAmountNum : rowsPerPage,
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(err) {
          if (!displayError) {
            B.triggerEvent('onError', err);
          }
        },
      },
      !model,
    );

    console.log(useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    ));

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );
    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;


    // // Hier doen we een query, op basis van de filter halen we alle records binnen.
    // var where = useFilter(filter);
    // var {
    //   loading,
    //   error,
    //   data,
    //   refetch,
    // } =
    //   model &&
    //   useAllQuery(model, {
    //     rawFilter: where,
    //     onCompleted(res) {
    //       var hasResult = res && res.results && res.results.length > 0;
    //       if (hasResult) {
    //         B.triggerEvent('onSuccess', res.results);
    //       } else {
    //         B.triggerEvent('onNoResults');
    //       }
    //     },
    //     onError(err) {
    //       console.log(err, error);
    //     },
    //   });
      
    var results = data ? data.results : [];

    console.log(results);
    // Wat dit doet weet ik niet precies, maar volgens mij is het nodig om het component na de query opnieuw te renderen.
    // B.defineFunction('Refetch', () => {
    //   refetch();
    // });

    // Als er geen data is, kunnen we het niet verwerken
    if (data && data.totalCount > 0){
      // definieer takenlijst
      let tasks = [];
      // ga door alle taken in de data
      for (let entry in results){

        // kies id op basis van type
        let typeId = (results[entry].taskType === "project") ? results[entry].employeeName : results[entry].id;

        // definieer een gantt task op basis van de datarow
        let task = {
          start: new Date(Date.parse(results[entry].startDate)),
          end: new Date(Date.parse(results[entry].endDate)),
          name: results[entry].employeeName,
          id: typeId,
          type: results[entry].taskType,
          // progress: results[entry].utilization,
          // project: results[entry].project,
          // isDisabled: results[entry].isDisabled,
          // styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        }
        // voeg taak toe aan takenlijst
        tasks.push(task)
      }

    }

    if (tasks) {return (
      <div class={hideTaskDate ? 'disable-task-dates' : ''}>
      <Gantt tasks={tasks}
      viewMode={view}
      columnWidth={columnWidth}
      listCellWidth={task_info} />
      </div>
      );
    } else {
      return <p>"No Tasks"</p>
    }

  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      '@global': {
        '@import': "url('https://assets.bettyblocks.com/47119c0b6b58402a93bc0dc872179dce_assets/files/1c15340df6274bc1bfc6fd3820af8aa6')"
      },
    }
  },
}))();
