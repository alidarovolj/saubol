import {defineStore} from "pinia";

export const useStaffStore = defineStore('staff', () => {
    const runtimeConfig = useRuntimeConfig();
    const result = ref(null);
    const resultDetail = ref(null);
    const resultSpecs = ref(null);
    const resultSearch = ref(null);
    const resultRegister = ref(null);
    const resultDoc = ref(null);
    const resultOrderDoc = ref(null);
    const auth = useAuthStore();
    auth.initCookieToken()
    const { token } = storeToRefs(auth)
    const notify = (type, text) => {
        const toast = useNuxtApp().$toast;
        type ? toast.success(text) : toast.error(text);
    };

    return {
        result,
        resultDetail,
        resultSpecs,
        resultSearch,
        resultRegister,
        resultDoc,
        resultOrderDoc,
        async getStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data} = await useFetch(`/staff/?${queryString}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                result.value = data.value
            } else {
                result.value = false
            }
        },
        async registerStaff(form) {
            const {data} = await useFetch(`/staff/`, {
                method: 'POST',
                headers: {
                    accept: "application/json"
                },
                body: JSON.stringify(form),
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultRegister.value = data.value
            } else {
                resultRegister.value = false
            }
        },
        async getStaffDetail(id) {
            const {data} = await useFetch(`/staff/` + id, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                let daysInRussian = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                for (let j = 0; j < data.value.schedule.length; j++) {
                    let date = new Date(data.value.schedule[j].day);
                    let dayOfWeek = daysInRussian[date.getDay()];
                    let dayNumber = date.getDate().toString().padStart(2, '0'); // get the day of the month and pad it with 0 if needed
                    data.value.schedule[j].dayOfWeek = dayOfWeek;
                    data.value.schedule[j].dayNumber = dayNumber; // add the day number to the schedule object

                    for (let k = 0; k < data.value.schedule[j].times.length; k++) {
                        let timePeriods = [];

                        let start = new Date(`1970-01-01T${data.value.schedule[j].times[k].start}Z`);
                        let end = new Date(`1970-01-01T${data.value.schedule[j].times[k].end}Z`);
                        let duration = data.value.schedule[j].duration;

                        while (start < end) {
                            let periodEnd = new Date(start.getTime() + duration * 60000);
                            if (periodEnd > end) {
                                break;
                            }
                            let startHours = start.getUTCHours().toString().padStart(2, '0');
                            let startMinutes = start.getUTCMinutes().toString().padStart(2, '0');
                            let startSeconds = start.getUTCSeconds().toString().padStart(2, '0');

                            let endHours = periodEnd.getUTCHours().toString().padStart(2, '0');
                            let endMinutes = periodEnd.getUTCMinutes().toString().padStart(2, '0');
                            let endSeconds = periodEnd.getUTCSeconds().toString().padStart(2, '0');

                            timePeriods.push({
                                start: `${startHours}:${startMinutes}:${startSeconds}`,
                                end: `${endHours}:${endMinutes}:${endSeconds}`
                            });
                            start = periodEnd;
                        }

                        data.value.schedule[j].times[k].timePeriods = timePeriods;
                    }
                }
                resultDetail.value = data.value
            } else {
                resultDetail.value = false
            }
        },
        async specializationList() {
            const {data} = await useFetch(`/staff/specialization`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultSpecs.value = data.value
            } else {
                resultSpecs.value = false
            }
        },
        async searchStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            const {data} = await useFetch(`/staff/search/?${queryString}`, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                let daysInRussian = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                for (let i = 0; i < data.value.data.length; i++) {
                    for (let j = 0; j < data.value.data[i].schedule.length; j++) {
                        let date = new Date(data.value.data[i].schedule[j].day);
                        let dayOfWeek = daysInRussian[date.getDay()];
                        let dayNumber = date.getDate().toString().padStart(2, '0'); // get the day of the month and pad it with 0 if needed
                        data.value.data[i].schedule[j].dayOfWeek = dayOfWeek;
                        data.value.data[i].schedule[j].dayNumber = dayNumber; // add the day number to the schedule object

                        for (let k = 0; k < data.value.data[i].schedule[j].times.length; k++) {
                            let timePeriods = [];

                            let start = new Date(`1970-01-01T${data.value.data[i].schedule[j].times[k].start}Z`);
                            let end = new Date(`1970-01-01T${data.value.data[i].schedule[j].times[k].end}Z`);
                            let duration = data.value.data[i].schedule[j].duration;

                            while (start < end) {
                                let periodEnd = new Date(start.getTime() + duration * 60000);
                                if (periodEnd > end) {
                                    break;
                                }
                                let startHours = start.getUTCHours().toString().padStart(2, '0');
                                let startMinutes = start.getUTCMinutes().toString().padStart(2, '0');
                                let startSeconds = start.getUTCSeconds().toString().padStart(2, '0');

                                let endHours = periodEnd.getUTCHours().toString().padStart(2, '0');
                                let endMinutes = periodEnd.getUTCMinutes().toString().padStart(2, '0');
                                let endSeconds = periodEnd.getUTCSeconds().toString().padStart(2, '0');

                                timePeriods.push({
                                    start: `${startHours}:${startMinutes}:${startSeconds}`,
                                    end: `${endHours}:${endMinutes}:${endSeconds}`
                                });
                                start = periodEnd;
                            }

                            data.value.data[i].schedule[j].times[k].timePeriods = timePeriods;
                        }
                    }
                }
                resultSearch.value = data.value
            } else {
                resultSearch.value = false
            }
        },
        async importDoc(file) {
            const formData = new FormData();
            formData.append('file', file);

            const {data} = await useFetch(`/staff/import-docs`, {
                method: 'POST',
                headers: {
                    accept: "application/json"
                },
                body: formData,
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultDoc.value = data.value
            } else {
                resultDoc.value = false
            }
        },
        async setOrderDoctor(form) {
            const {data} = await useFetch(`/doctor`, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${token.value}`
                },
                body: form,
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            if (data.value) {
                resultOrderDoc.value = data.value
            } else {
                resultOrderDoc.value = false
            }
        },
    }
})