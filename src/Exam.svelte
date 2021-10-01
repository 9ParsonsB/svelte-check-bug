<script lang="ts">
    import cssVars from "svelte-css-vars";
    import { beforeUpdate } from "svelte";

    import ExamHeader from "./ExamHeader.svelte";

    let diastole: number = 0;
    let systole: number = 0;
    let bpm: number = 0;
    let innerWidth: number | undefined; // window width
    let innerHeight: number | undefined; // window height
    let unit = "mmHg";
    let unitPulse = "bpm";
    let width: number | undefined;
    let height: number | undefined;
    let connected: boolean = false;

    let inputValue: string | undefined;
    let deviceStatus: DeviceStatus;

    let device: Device;
    let editActive: boolean = false;
    let bpmInputValue: string | undefined;

    let style = { fontSize: "50px" };

    let edit: boolean = false;
    let enable: boolean = false;

    beforeUpdate(async () => {
        style = { fontSize: width ? width / 12 + "px" : "40px" };
    });

    $: value = `${systole}/${diastole}`;
    $: deviceName = "nonefound";
    $: connectionStatus = "obs-screen.disconnected";
    $: deviceStatusDesc = "obs-screen.disconnected";

    $: {
        if (inputValue) {
            const inputArray = inputValue.split("");
            if (!inputArray.includes("/") && inputValue.length > 3) {
                inputArray.splice(3, 0, "/");
                inputValue = inputArray.join("");
                // console.log(displayValue);
            }
        }
    }

    let pressureUnitRightDistance: string;
    let bpmUnitRightDistance: string;

    $: if (editActive) {
        pressureUnitRightDistance = inputValue
            ? inputValue.length === 1
                ? "16ch"
                : `${18 - 2.5 * inputValue.length}ch`
            : "16ch";
    } else {
        pressureUnitRightDistance = `${18 - 2 * value.toString().length}ch`;
    }

    $: if (editActive) {
        bpmUnitRightDistance = bpmInputValue
            ? bpmInputValue.length === 1
                ? "16ch"
                : `${19 - 2.5 * bpmInputValue.length}ch`
            : "18ch";
    } else {
        bpmUnitRightDistance = `${19 - 2.5 * bpm.toString().length}ch`;
    }

    $: styleVars = {
        fontSize:
            width! > innerWidth! / 2 && height! > innerHeight! / 2
                ? `12vmax`
                : `6vmax`,
        unitSize:
            width! > innerWidth! / 2 && height! > innerHeight! / 2
                ? `3vmax`
                : `1.5vmax`,
        pressureInputWidth: inputValue ? `${inputValue.length}ch` : "31%",
        pressureUnitRight: pressureUnitRightDistance,
        bpmInputWidth: bpmInputValue ? `${bpmInputValue.length}ch` : "31%",
        bpmUnitRight: bpmUnitRightDistance,
    };

    const editReading = () => (editActive = !editActive);
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div
    bind:clientWidth="{width}"
    bind:clientHeight="{height}"
    class="container"
    use:cssVars="{styleVars}"
>
    <ExamHeader
        title="{'obs-screen.blood-pressure-title'}"
        deviceName="{deviceName}"
        deviceStatus="{deviceStatus}"
        deviceStatusDesc="{deviceStatusDesc}"
    />
    <div class="display" class:hidden="{editActive}">
        <div class="pressure">
            {#if editActive === false}
                <div class="pressure__number">{value}</div>
            {:else}
                <input
                    class="pressure__input"
                    type="text"
                    placeholder="-/-"
                    bind:value="{inputValue}"
                    maxlength="7"
                />
            {/if}
            <div class="pressure__unit">
                {unit}
            </div>
        </div>
        <div class="oximetry">
            {#if editActive === false}
                <div class="oximetry__number">{bpm}</div>
            {:else}
                <input
                    class="oximetry__input"
                    type="text"
                    placeholder="-"
                    bind:value="{bpmInputValue}"
                    maxlength="3"
                />
            {/if}
            <div class="oximetry__unit">
                {unitPulse}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        display: none;
    }

    .display {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 60%;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .pressure {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 50%;
        align-items: flex-end;
        justify-content: center;

        &__number {
            font-size: var(--fontSize);
        }

        &__unit {
            padding-top: 5%;
            font-size: var(--unitSize);
            align-self: flex-start;
            position: absolute;
            right: var(--pressureUnitRight);
        }

        &__input {
            background-color: #464646;
            border: none;
            outline: none;
            color: white;
            font-size: var(--fontSize);
            width: var(--pressureInputWidth);
            padding: 0;
            font-family: "Open Sans Light";
            text-align: center;
            resize: none;
            overflow: visible;
            align-self: center;
        }
    }

    .oximetry {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 50%;
        align-items: flex-start;
        justify-content: center;

        &__number {
            font-size: var(--fontSize);
        }

        &__unit {
            font-size: var(--unitSize);
            align-self: flex-start;
            position: absolute;
            right: var(--bpmUnitRight);
        }

        &__input {
            background-color: #464646;
            border: none;
            outline: none;
            color: white;
            font-size: var(--fontSize);
            width: var(--bpmInputWidth);
            padding: 0;
            font-family: "Open Sans Light";
            text-align: center;
            resize: none;
            overflow: visible;
            align-self: center;
        }
    }
</style>
