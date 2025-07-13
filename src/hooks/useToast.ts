import { toast } from 'sonner'

interface ToastOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  dismissible?: boolean
}

export const useToast = () => {
  const showToast = (message: string, options?: ToastOptions) => {
    return toast(message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showSuccess = (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showError = (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showWarning = (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showInfo = (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      description: options?.description,
      action: options?.action,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      description: options?.description,
      duration: options?.duration,
      dismissible: options?.dismissible,
    })
  }

  const showPromise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: Error) => string)
    }
  ) => {
    return toast.promise(promise, messages)
  }

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId)
    } else {
      toast.dismiss()
    }
  }

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    promise: showPromise,
    dismiss,
  }
}

export default useToast
