 <template>
  <div class="wrapper">
    <StaticPart/>
    <Nearby/>
  </div>
  <Docker :currentIndex="0"/>
</template>
<script>
import StaticPart from "./StaticPart";
import Nearby from "./Nearby";
import Docker from "../../components/Docker";
export default {
  name: "Home",
  components: {
    StaticPart,
    Nearby,
    Docker
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow-y: auto; //纵向滚动
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
</style>
