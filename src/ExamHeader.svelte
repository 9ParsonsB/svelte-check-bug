<script lang="ts">
    export let title: string;
    export let deviceName: string;
    // type DeviceStatusType = keyof typeof DeviceStatus
    //deviceStatus = DeviceStatus[deviceStatus.toString() as DeviceStatusType]
    //deviceStatus = deviceStatus
    export let deviceStatusDesc: string;
</script>

<div class="header">
    <div class="header__title">
        {title}
    </div>
    <div class="header__detail">
        <span>{deviceName}</span>
    </div>
</div>

<style lang="scss">
    .header {
        height: 20%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &__title {
            font-size: 2.5vw;
            font-weight: 500;
            font-family: "Open Sans";
            margin: 0 3%;
            text-align: left;
        }
        &__detail {
            font-size: 1.5vw;
            margin: 0 2%;
            display: flex;
            font-family: "Open Sans";
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
        }
    }

    .connected {
        color: green;
        font-family: "Open Sans" !important;
    }
    .connecting {
        color: white;
        font-family: "Open Sans" !important;
    }
    .disconnected {
        color: #eb5b53;
        font-family: "Open Sans" !important;
    }
</style>
