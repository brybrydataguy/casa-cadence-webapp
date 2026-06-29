import { AppScreen } from '@/components/AppScreen'

const todaysTasks = [
  ['Kitchen', 'Clean counters', '8:30 AM'],
  ['Living Room', 'Vacuum', '9:15 AM'],
  ['Laundry', 'Wash towels', '10:00 AM'],
  ['Outdoor', 'Water plants', '11:30 AM'],
]

const stats = [
  ['3', 'Tasks completed'],
  ['2', 'Due soon'],
  ['4', 'Spaces active'],
]

export function AppDemo() {
  return (
    <AppScreen>
      <AppScreen.Header>
        <AppScreen.Title>Home</AppScreen.Title>
        <AppScreen.Subtitle>Today, May 14</AppScreen.Subtitle>
      </AppScreen.Header>
      <AppScreen.Body>
        <div className="p-4">
          <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200 ring-inset">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-cyan-900 uppercase">
                  Today
                </p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                  Tuesday, May 14
                </h2>
              </div>
              <div className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                On track
              </div>
            </div>
            <div className="mt-4 divide-y divide-gray-200 rounded-xl bg-white">
              {todaysTasks.map(([room, task, time]) => (
                <div
                  key={`${room}-${task}`}
                  className="grid grid-cols-[1fr_1.3fr_auto] gap-3 px-3 py-3 text-xs"
                >
                  <span className="text-gray-500">{room}</span>
                  <span className="font-medium text-gray-900">{task}</span>
                  <span className="text-gray-500">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200 bg-white p-3"
              >
                <div className="text-xl font-semibold text-gray-900">
                  {value}
                </div>
                <div className="mt-1 text-[0.68rem] leading-4 text-gray-500">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">
                Maintenance reminder
              </span>
              <span className="text-xs text-gray-500">Friday</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Replace HVAC filter and add a note for the next cycle.
            </p>
            <div className="mt-4 rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white">
              View calendar
            </div>
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}
