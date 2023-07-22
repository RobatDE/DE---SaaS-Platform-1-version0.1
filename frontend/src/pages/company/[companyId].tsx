import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/company/companySlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';

const EditCompany = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = (type, msg) => toast(msg, { type, position: 'bottom-center' });
  const initVals = {};
  const [initialValues, setInitialValues] = useState(initVals);

  const { company } = useAppSelector((state) => state.company);

  const { companyId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: companyId }));
  }, [companyId]);

  useEffect(() => {
    if (typeof company === 'object') {
      setInitialValues(company);
    }
  }, [company]);

  useEffect(() => {
    if (typeof company === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = company[el]));

      setInitialValues(newInitialVal);
    }
  }, [company]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: companyId, data }));
    await router.push('/company/company-list');
    notify('success', 'Company was updated!');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit company')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Edit company'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <BaseDivider />

              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/company/company-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
      <ToastContainer />
    </>
  );
};

EditCompany.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditCompany;
