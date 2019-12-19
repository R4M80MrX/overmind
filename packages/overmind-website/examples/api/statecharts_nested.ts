export default (ts) =>
  ts
    ? [
        {
          code: `
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

const nestedChart: Statechart<typeof config, {
  FOO: void
  BAR: void
}> = {
  initial: 'FOO',
  states: {
    FOO: {
      on: {
        transitionToBar: 'BAR'
      }
    },
    BAR: {
      on: {
        transitionToFoo: 'FOO'
      }
    }
  }
}

const chart: Statechart<typeof config, {
  STATE_A: {
    nestedChartId: typeof nestedChart
  }
  STATE_B: void
}> = {
  initial: 'STATE_A',
  states: {
    STATE_A: {
      on: {
        transitionToStateB: 'STATE_B'
      },
      charts: { nestedChartId: nestedChart }
    },
    STATE_B: {
      on: {
        transitionToStateA: 'STATE_A'
      }
    }
  }
}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
    : [
        {
          code: `
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}


const nestedChart = {
  initial: 'FOO',
  states: {
    FOO: {
      on: {
        transitionToBar: 'BAR'
      }
    },
    BAR: {
      on: {
        transitionToFoo: 'FOO'
      }
    }
  }
}

const chart = {
  initial: 'STATE_A',
  states: {
    STATE_A: {
      on: {
        transitionToStateB: 'STATE_B'
      },
      charts: { nestedChartId: nestedChart }
    },
    STATE_B: {
      on: {
        transitionToStateA: 'STATE_A'
      }
    }
  }
}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
