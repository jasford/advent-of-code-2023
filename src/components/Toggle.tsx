import { Switch } from '@headlessui/react';

const Toggle = ({ enabled, setEnabled, label }: {
  enabled: boolean
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
  label: string
}): JSX.Element => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={[
          enabled ? 'bg-slate-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          ].join(' ')}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">{label}</span>{' '}
      </Switch.Label>
    </Switch.Group>
  )
};

export default Toggle;
