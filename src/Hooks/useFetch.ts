import {
  useState,
  Dispatch,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";

import { useToasts } from "react-toast-notifications";

import { NOTIFY_SUCCESS } from "Constants";

// #region API error messages
export const ERROR_MSG_INVALID_DATA =
  "Data was not sent properly, please check input data and try again";
export const ERROR_MSG_NOT_AUTHORIZED =
  "You are not authorized to see this content";
export const ERROR_MSG_NOT_FOUND = "Resource not found";
export const ERROR_MSG_500 =
  "Ooops! Something went wrong, please contact support.amsterdam@groupm.com";
export const ERROR_MSG_SERVICE = "Service is not available";
// #endregion

export enum FetchMethodEnum {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

const { GET, PUT, POST, DELETE } = FetchMethodEnum;

export interface FetchOptions<T> {
  body?: T;
  skip?: boolean;
  notify?: boolean;
  method?: FetchMethodEnum;
}

type ResponsePropType<G, P> = { [key in FetchMethodEnum]?: G | P | undefined };
interface IResponse<G, P> extends ResponsePropType<G, P> {
  get?: G;
  post?: P;
}

const getFormatedErrorMsg = (
  type: number,
  validationMessages: string[],
  statusText: string
): string[] => {
  const errors: { [key: number]: string[] } = {
    400: [ERROR_MSG_INVALID_DATA],
    401: [ERROR_MSG_NOT_AUTHORIZED],
    403: [ERROR_MSG_NOT_AUTHORIZED],
    404: [ERROR_MSG_NOT_FOUND],
    422: validationMessages,
    500: [ERROR_MSG_500],
  };

  return errors[type] || [statusText];
};

const generateOptions = (
  method: FetchMethodEnum = GET,
  body?: unknown
): Record<string, unknown> => {
  const options = {
    [GET]: {
      Accept: "application/json",
      method: GET,
    },
    [POST]: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: POST,
      body: JSON.stringify(body),
    },
    [PUT]: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: PUT,
      body: JSON.stringify(body),
    },
    [DELETE]: {
      method: DELETE,
      body: JSON.stringify(body),
    },
  };

  return options[method];
};

export function useFetch<G = undefined, P = undefined>(
  initialUrl: string | null,
  options: FetchOptions<unknown>
): {
  data: IResponse<G, P> | null;
  isLoading: boolean;
  hasError: boolean;
  isSuccessful: boolean;
  errorMessage: string[];
  updateUrl: Dispatch<SetStateAction<string | null>>;
  refetch: () => void;
  numberOfRefetchs: number;
  executeFetch: (
    endpoint?: string | null | undefined,
    opt?: FetchOptions<unknown> | undefined
  ) => Promise<void>;
  resetPostData: () => void;
  resetGetData: () => void;
} {
  const { addToast } = useToasts();
  const [url, updateUrl] = useState(initialUrl);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [data, setData] = useState<IResponse<G, P> | null>(null);

  const refetch = useCallback(() => {
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  }, []);

  const resetPostData = useCallback(() => {
    setData(
      (prevData) => ({ ...prevData, [POST]: undefined } as IResponse<G, P>)
    );
  }, []);

  const resetGetData = useCallback(() => {
    setData(
      (prevData) => ({ ...prevData, [GET]: undefined } as IResponse<G, P>)
    );
  }, []);

  const notifySuccess = useCallback(
    (_method?: FetchMethodEnum) => {
      if (_method !== GET) {
        addToast(NOTIFY_SUCCESS, {
          appearance: "success",
        });
      }
    },
    [addToast]
  );

  const executeFetch = useCallback(
    async (endpoint?: string | null, opt?: FetchOptions<unknown>) => {
      const method = opt?.method;
      const fetchUrl = endpoint;
      const body = opt?.body;
      const skip = opt?.skip;
      const notify = opt?.notify ?? true;

      if (skip) return;

      setIsLoading(true);
      setIsSuccessful(false);
      setHasError(false);
      setErrorMessage([]);

      try {
        const fetchOptions = generateOptions(method, body);

        const response = await fetch(
          `${process.env.REACT_APP_SERVICE}/${fetchUrl}`,
          fetchOptions
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          result = await response.json();
        } else {
          result = await response.blob();
        }

        if (response.ok) {
          setIsSuccessful(true);
          if (notify) notifySuccess(method);

          const key =
            (method === PUT || method === DELETE) && method != null
              ? POST
              : method ?? GET;
          setData((prevData) => ({ ...prevData, [key]: result }));
        } else {
          setHasError(true);
          const errorMsg = getFormatedErrorMsg(
            response.status,
            result.validation_messages,
            response.statusText
          );
          setErrorMessage(errorMsg);
        }
      } catch (err) {
        setHasError(true);
        setErrorMessage(
          Array.isArray(err.message) ? err.message : [err.message]
        );
      } finally {
        setIsLoading(false);
      }
    },
    [notifySuccess]
  );

  useEffect(() => {
    executeFetch(url, {
      body: options.body,
      method: options.method,
      notify: options.notify,
      skip: options.skip,
    });
  }, [
    url,
    refetchIndex,
    executeFetch,
    options.body,
    options.skip,
    options.method,
    options.notify,
  ]);

  useEffect(() => {
    if (!hasError && !!errorMessage) {
      return;
    }

    errorMessage.forEach((msg) => {
      addToast(msg, {
        appearance: "error",
      });
    });
  }, [addToast, errorMessage, hasError]);

  return {
    data,
    refetch,
    hasError,
    updateUrl,
    isLoading,
    errorMessage,
    executeFetch,
    isSuccessful,
    resetGetData,
    resetPostData,
    numberOfRefetchs: refetchIndex,
  };
}

export default useFetch;
