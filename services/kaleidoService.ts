import {
  IBlockDetail,
  IBlockJSON,
  IGenesisResponse,
  ITransactionReceipt,
  ProposalJson,
  ValidatorResponse,
} from '@/types';
import axiosInstance, {axiosInstanceNamada} from '../libs/axios/axiosInstance';

export const getLatestBlocks = async (): Promise<IBlockJSON> => {
  const url = `/blocks`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error retrieving transaction history:', error);
    throw error;
  }
};

export const getTransactionDetail = async ({
  hash,
}: {
  hash: string;
}): Promise<ITransactionReceipt> => {
  const url = `/tx/${hash}`;

  try {
    const response = await axiosInstanceNamada.get(url);

    return response.data;
  } catch (error) {
    console.error('Error retrieving transaction history:', error);
    throw error;
  }
};

export const getBlockDetail = async ({
  height,
}: {
  height: string;
}): Promise<IBlockDetail> => {
  const url = `/block`;

  try {
    const response = await axiosInstance.get(url, {
      params: {
        height,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving transaction history:', error);
    throw error;
  }
};

export const getValidator = async (): Promise<ValidatorResponse> => {
  const url = `/validators`;
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error('Error retrieving transaction history:', error);
    throw error;
  }
};

export const getOverview = async (): Promise<IGenesisResponse> => {
  const url = '/overview';
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error('Error retrieving transaction history:', error);
    throw error;
  }
};

export const getLatestProposals = async (): Promise<ProposalJson> => {
  const url = `/proposals`;
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error('Error retrieving getLatestProposals:', error);
    throw error;
  }
};
