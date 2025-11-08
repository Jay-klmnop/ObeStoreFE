import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
  };
}

export interface CustomerOrderInfo {
  orderId: string;
  orderName: string;
  customerEmail: string;
  customerName: string;
  customerNickrname: string;
  customerMobilePhone: string;
  customerAddress: string;
}

const fetchCustomer = async (): Promise<CustomerOrderInfo> => {
  const { data } = await axios.get<DummyUser>('https://dummyjson.com/users/1');
  return {
    orderId: 'iLfhnnJBRBK-I1ng17MeA',
    orderName: '토스 티셔츠 외 2건',
    customerEmail: data.email,
    customerName: `${data.firstName}${data.lastName}`,
    customerMobilePhone: data.phone,
    customerNickrname: data.username,
    customerAddress: `${data.address.address}${data.address.city}${data.address.postalCode}`,
  };
};

export const useCustomerQuery = () => {
  return useQuery<CustomerOrderInfo>({
    queryKey: ['customer'],
    queryFn: () => fetchCustomer(),
    staleTime: 1000 * 60 * 5,
  });
};
