export const formatResponse = (data, message = 'Success', status = 200) => {
    return {
        status,
        message,
        data,
    };
};

export const logError = (error) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${error}`);
};