document.querySelectorAll<HTMLButtonElement>('[data-copy-code]').forEach(button=>{
  button.addEventListener('click',async()=>{
    const status=button.parentElement?.querySelector<HTMLElement>('.copy-status');
    try { await navigator.clipboard.writeText(button.dataset.copyCode!); button.textContent='已复制'; if(status)status.textContent='优惠码已复制'; setTimeout(()=>{button.textContent='复制';if(status)status.textContent='';},2000); }
    catch { if(status)status.textContent='请选中优惠码手动复制'; }
  });
});
