<script lang="ts">
    import { Circle } from "svelte-loading-spinners";
    import { Link } from "svelte-navigator";
    import ExamMode from "./ExamMode.svelte";
</script>

<span>Hello, world!</span>
<Link to="/exam">
    <div class="exam-mode">
        <div class="exam-mode__icon">
            <ExamMode />
        </div>
        <div class="exam-mode__title">Exam Mode</div>
    </div>
</Link>

<style lang="scss">
    .exam-mode {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        &__icon {
            width: 20vmin;
            height: 20vmin;
            border-radius: 50%;
            // background: url("/home/proex-exam-mode") no-repeat center;
            background-size: cover;
        }
        &__title {
            color: white;
            font-size: 2.2vw;
            vertical-align: middle;
            line-height: 100%;
            padding-top: 10%;
        }
    }
</style>
