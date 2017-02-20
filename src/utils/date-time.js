export const dayEnd = date => new Date(date.setHours(23, 59, 59));

export const dayStart = date => new Date(date.setHours(0, 0, 0));

export const monthEnd = date => dayEnd(new Date(date.getFullYear(), date.getMonth() + 1, 0));

export const monthStart = date => dayStart(new Date(date.getFullYear(), date.getMonth(), 1));

export const monthBefore = date => new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());

export const dayBefore = date => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
