<script>
export default {
  name: "LearnJSXChild",
  props: ["msg", "changePerson"],
  setup(props, { slots }) {
    return function () {
      return (
        <div>
          <div>
            {props.msg.name}
            {props.msg.age}
            {slots.default()}
          </div>
          <button onClick={props.changePerson}>button</button>
        </div>
      );
    };
  },
};
</script>

<style scoped></style>
