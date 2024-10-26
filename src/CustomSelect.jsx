import useClickOutside from './useClickOutside'

const CustomSelect = ({ onChange }) => {
  const LANGS = [
    {
      name: 'English',
      icon: 'flag-icon-us',
    },
    {
      name: 'French',
      icon: 'flag-icon-fr',
    },
    { name: 'Spanish', icon: 'flag-icon-es' },
  ]
  const [lang, setLang] = useState(LANGS[0])
  const [isShow, setIsShow] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setIsShow(false))
  return (
    <div className='w-24 cursor-pointer relative'>
      <div onClick={() => setIsShow(true)} ref={ref}>
        <span className={`flag-icon ${lang.icon}`} /> {` ${lang.name}`}
      </div>
      <div
        className={`border border-b-0 absolute top-6 left-0 bg-white ${
          !isShow && 'hidden'
        }`}
      >
        {LANGS.map((lang, index) => (
          <div
            key={index}
            className='border-b'
            onClick={() => {
              setLang(lang)
              onChange(lang)
            }}
          >
            <span className={`flag-icon ${lang.icon}`} />
            {` ${lang.name}`}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect
