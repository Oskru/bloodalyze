import React from 'react';
import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Alert,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

const styles = {
  paperContainer: {
    height: 'auto',
    width: 'auto',
    maxWidth: '350px',
    padding: '20px',
  },
  addText: {
    display: 'flex',
    fontSize: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  applyMarginBottom: {
    marginBottom: '25px',
  },
  applyMarginTop: {
    marginTop: '25px',
  },
  paperC: {
    margin: '20px',
  },
};

const elementInputData = {
  hemoglobin: {
    value: 'hemoglobin',
    placeholder: 'in g/dl',
    label: 'Hemoglobin',
  },
  hematocrit: { value: 'hematocrit', placeholder: 'in %', label: 'Hematocrit' },
  rbc: {
    value: 'rbc',
    placeholder: 'in millions/uL',
    label: 'Red blood cells',
  },
  wbc: {
    value: 'wbc',
    placeholder: 'in thousands/uL',
    label: 'White blood cells',
  },
  platelets: {
    value: 'platelets',
    placeholder: 'in thousands/uL',
    label: 'Platelets',
  },
  mcv: { value: 'mcv', placeholder: 'in fL', label: 'Mean corpuscular volume' },
  mch: {
    value: 'mch',
    placeholder: 'in pg',
    label: 'Mean corpuscular hemoglobin',
  },
  neutrophils: {
    value: 'neutrophils',
    placeholder: 'in %',
    label: 'Neutrophils',
  },
  lymphocytes: {
    value: 'lymphocytes',
    placeholder: 'in %',
    label: 'Lymphocytes',
  },
  monocytes: { value: 'monocytes', placeholder: 'in %', label: 'Monocytes' },
  eosinophils: {
    value: 'eosinophils',
    placeholder: 'in %',
    label: 'Eosinophils',
  },
  basophils: { value: 'basophils', placeholder: 'in %', label: 'Basophils' },
};

// TODO: Style this component
function Addresult() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

  const [dateValue, setDateValue] = useState(dayjs());

  const [resultInputs, setResultInputs] = useState([]);

  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {}, [dataSent]);

  // Select for result inputs
  const handleSelectChange = (event) => {
    setResultInputs([...resultInputs, event.target.value]);
  };

  // MenuItems for result inputs
  const menuItems = Object.keys(elementInputData).map((element, index) => (
    <MenuItem
      value={element}
      key={element}
      disabled={resultInputs.includes(element)}
    >
      {elementInputData[element].label}
    </MenuItem>
  ));

  // TextFields for result inputs
  const [textValues, setTextValues] = useState({
    hemoglobin: '',
    hematocrit: '',
    rbc: '',
    wbc: '',
    platelets: '',
    mcv: '',
    mch: '',
    neutrophils: '',
    lymphocytes: '',
    monocytes: '',
    eosinophils: '',
    basophils: '',
  });
  const [helperText, setHelperText] = useState({
    hemoglobin: '',
    hematocrit: '',
    rbc: '',
    wbc: '',
    platelets: '',
    mcv: '',
    mch: '',
    neutrophils: '',
    lymphocytes: '',
    monocytes: '',
    eosinophils: '',
    basophils: '',
  });
  const [error, setError] = useState({
    hemoglobin: false,
    hematocrit: false,
    rbc: false,
    wbc: false,
    platelets: false,
    mcv: false,
    mch: false,
    neutrophils: false,
    lymphocytes: false,
    monocytes: false,
    eosinophils: false,
    basophils: false,
  });
  const resultRegex = /^\d*(\.\d*)?$/;

  const handleTextChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    if (inputValue === '' || resultRegex.test(inputValue)) {
      // Only allow numbers and decimals
      setTextValues((prevTextValue) => ({
        ...prevTextValue,
        [inputName]: inputValue,
      })); // Clear previous errors and helper text
      setError((prevError) => ({
        ...prevError,
        [inputName]: false,
      }));
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        [inputName]: '',
      }));
    } else {
      // If input is not a number or decimal, set error
      setError((prevError) => ({
        ...prevError,
        [inputName]: true,
      }));
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        [inputName]: 'Only numbers are allowed',
      }));
    }
  };

  // Handle input deletion
  const handleDeleteInput = (event, input) => {
    // Delete input that was clicked, only non-clicked inputs will be returned in the filter
    setResultInputs((current) => current.filter((item) => item !== input));
    setTextValues((prevTextValue) => ({
      ...prevTextValue,
      [input]: '',
    }));
  };

  const onSubmit = async (data) => {
    // Filter null values from textValue object
    const filteredTextValue = Object.entries(textValues).filter(
      (item) => item[1] !== ''
    );

    // Convert filteredTextValue array to object
    const elementsObject = Object.fromEntries(filteredTextValue);

    const submitRegex = /^-?\d+(\.\d+)?$/;
    // Filter out non-numeric values from filteredObject
    for (const key in elementsObject) {
      if (!submitRegex.test(elementsObject[key])) {
        setHelperText((prevHelperText) => ({
          // If input is invalid, set error and helperText
          ...prevHelperText,
          [key]: 'Invalid input format',
        }));
        setError((prevError) => ({
          ...prevError,
          [key]: true,
        }));
        return; // Return to prevent submission
      } else {
        // If input is valid, clear error and helperText
        setHelperText((prevHelperText) => ({
          ...prevHelperText,
          [key]: '',
        }));
        setError((prevError) => ({
          ...prevError,
          [key]: false,
        }));
      }
    }

    data.elements = elementsObject;
    console.log(data);
    try {
      // Get token from local storage and add it to url
      const token = localStorage.getItem('token');
      const url = `http://localhost:8000/api/results`;
      console.log(token);

      // Send data to server
      const { data: res } = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSent(true);
    } catch (err) {
      if (
        err?.response &&
        err?.response.status >= 400 &&
        err?.response.status <= 500
      ) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={10} sx={{ m: '10px', p: 2, fontSize: '1.2rem' }}>
            <p style={styles.welcome}>
              <span
                style={{
                  fontSize: '1.4rem',
                  display: 'block',
                  marginBottom: '15px',
                }}
              >
                Welcome to the <b>"Add Result"</b> page of Bloodalyze!
              </span>{' '}
              Here, you can input your blood count results and have them stored
              in your account for easy access and tracking.
            </p>
            <p>
              <b>To get started</b>, first write a name for that test and select
              the type of blood count result you want to input from the dropdown
              menu. Then, enter the corresponding value in the text field
              provided. You can add multiple results by clicking multiple times
              on positions from the dropdown menu. To remove a result, click the
              "Delete" button next to the result.
            </p>
            <p>
              Make sure to also select the date that the blood count was taken
              using the date picker.
            </p>

            <p>
              Once you have entered all of your results, simply click the
              "Submit" button to have them added to your account. You can then
              view your results in graphical form and receive personalized
              health tips by accessing your account page.
            </p>
            <p style={{ color: 'primary.main' }}>
              Thank you for using Bloodalyze!
            </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ margin: '10px' }}>
            <Paper
              elevation={10}
              sx={{ m: 'auto' }}
              style={styles.paperContainer}
            >
              <div style={styles.addText}>
                Add a test result&nbsp;&nbsp;
                <AddCircleIcon fontSize='large' color='primary' />
              </div>
              <Collapse in={dataSent}>
                <Alert
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setDataSent(false);
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Successfully added test result!
                </Alert>
              </Collapse>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label='Test name'
                  name='testName'
                  placeholder='Enter test name'
                  variant='standard'
                  type='text'
                  style={styles.applyMarginBottom}
                  fullWidth
                  {...register('testName', {
                    required: 'Test name is required',
                  })}
                  error={Boolean(errors.testName)}
                  helperText={errors.testName?.message}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label='Test date'
                    inputFormat='DD/MM/YYYY'
                    value={dateValue}
                    onChange={handleChangeDate}
                    style={styles.applyMarginBottom}
                    {...register('testDate', {
                      required: 'true',
                    })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {resultInputs.map((resultInput, index) => (
                  <div key={index}>
                    <TextField
                      label={elementInputData[resultInput]['label']}
                      name={resultInput}
                      placeholder={elementInputData[resultInput]['placeholder']}
                      value={textValues[resultInput]}
                      onChange={handleTextChange}
                      helperText={helperText[resultInput]}
                      error={error[resultInput]}
                      variant='standard'
                      type='text'
                      sx={{ mt: 1, mb: 1, width: '60%' }}
                    />
                    <Button
                      sx={{ mt: '14px' }}
                      onClick={(event, input) =>
                        handleDeleteInput(event, resultInput)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                ))}
                <div style={{ marginTop: '30px', fontSize: '1.3rem' }}>
                  Add element &nbsp;
                  <Select
                    label='Element type'
                    name='elementType'
                    placeholder='Select element type'
                    variant='standard'
                    value=''
                    onChange={handleSelectChange}
                    type='text'
                    sx={{ mb: '2', width: '40%' }}
                  >
                    {menuItems}
                  </Select>
                </div>
                <Button
                  type='submit'
                  variant='contained'
                  style={styles.applyMarginTop}
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Addresult;
