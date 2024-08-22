import "@logseq/libs";


const TASK_MARKERS = new Set(["DONE", "NOW", "LATER", "DOING", "TODO", "WAITING"]);

function main() {
  logseq.DB.onChanged(async (e) => {
    const taskBlock = e.blocks.find((block) => TASK_MARKERS.has(block.marker));
    if (!taskBlock) {
      return;
    }

    const hasProperty = taskBlock.properties?.doneMs;

    if (taskBlock.marker === "NOW"  || taskBlock.marker === "DONE" || taskBlock.marker === "DOING" || taskBlock.marker === "CANCELLED" || taskBlock.marker === "WAITING") {
      if (hasProperty) {
        return;
      }
      // const now = dayjs();
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      logseq.Editor.upsertBlockProperty(taskBlock.uuid, "last-worked-on", "[[" + yyyy + '_' + mm + '_' + dd + "]]");
    } else {
      if (!hasProperty) {
        return;
      }
      // logseq.Editor.removeBlockProperty(taskBlock.uuid, "worked-on");
    }
  });
}

logseq.ready(main).catch(console.error);
