import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [smallcharAllowed, setSmallcharAllowed] = useState(false);
  const [capitals, setCapitals] = useState(false);
  const [specials, setSpecialChar] = useState(false);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validatePassword, setValidatePassword] = useState(false); // State to toggle validation

  const validate = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = '';
    if (numbersAllowed) str += '0123456789';
    if (smallcharAllowed) str += 'abcdefghijklmnopqrstuvwxyz';
    if (capitals) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (specials) str += '!@#$%^&*()_+~`|';
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, smallcharAllowed, capitals, specials]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, smallcharAllowed, capitals, specials, generatePassword]);

  useEffect(() => {
    if (validatePassword) {
      setIsValid(validate());
    } else {
      setIsValid(null);
    }
  }, [password, validatePassword]);

  const passwordref = useRef(null);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordref.current.select();
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-2xl pb-2 mb-2 text-white">Password generator</h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            ref={passwordref}
            readOnly
            className="input flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 p-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <div className="mb-4">
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Length: {length}
            </label>
            <input
              type="range"
              id="length"
              className="w-full mt-1"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center pb-2">
            <input
              type="checkbox"
              id="numbers"
              className="mr-2"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers" className="text-sm text-gray-700">
              Numbers
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="small-characters"
                className="mr-2"
                onChange={() => setSmallcharAllowed((prev) => !prev)}
              />
              <label htmlFor="small-characters" className="text-sm text-gray-700">
                Small characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="capital-characters"
                className="mr-2"
                onChange={() => setCapitals((prev) => !prev)}
              />
              <label htmlFor="capital-characters" className="text-sm text-gray-700">
                Capital characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="special-characters"
                className="mr-2"
                onChange={() => setSpecialChar((prev) => !prev)}
              />
              <label htmlFor="special-characters" className="text-sm text-gray-700">
                Special characters
              </label>
            </div>
          </div>
        </div>
        <br />

        <div className="mb-4">
          <input
            type="checkbox"
            id="validate-password"
            className="mr-2 ml-2"
            checked={validatePassword}
            onChange={() => setValidatePassword((prev) => !prev)}
          />
          <label htmlFor="validate-password" className="text-sm text-white">
            Validate Password
          </label>
        </div>

        <ul>
          <li className="text-white font-thin p-2">
            The password will only be generated when the checkboxes are marked.
          </li>
          <li className="text-white font-thin pl-2">Validation starts from the 8th character.</li>
        </ul>

        {isValid === null ? (
          ''
        ) : isValid ? (
          <p className="text-center text-green-500 mt-4 font-semibold">Password is valid</p>
        ) : (
          <p className="text-center text-red-500 mt-4 font-semibold">Password is invalid</p>
        )}
      </div>
    </div>
  );
}

export default App;
