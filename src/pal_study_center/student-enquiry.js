// ===== STUDENT ENQUIRY SYSTEM - FIXED =====
(function(){
  const style = document.createElement('style');
  style.innerHTML = `
  .hero-btn.enquiry{background:#ffffff;color:#174a7e;border:1.5px solid #cbd5e1;}
  .hero-btn.enquiry:hover{background:#f8fafc;border-color:#174a7e;transform:translateY(-2px);}
  .enquiry-modal .modal-content{border-radius:20px;border:none;box-shadow:0 25px 70px rgba(15,23,42,.22);background:#fff;}
  .enquiry-modal .modal-header{padding:16px;border:none;display:flex;justify-content:flex-end;}
  .enquiry-modal .btn-close{background-color:#f1f5f9;border-radius:50%;width:26px;height:26px;opacity:1;background-size:10px;}
  .enquiry-modal .modal-body{padding:0 20px 20px 20px;}
  .enquiry-field{position:relative;}
  .enquiry-field i.bi:first-child{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:15px;pointer-events:none;}
  .enquiry-field input{width:100%;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 46px 14px 40px;font-size:13.5px;outline:none;background:#f8fafc;font-weight:500;}
  .enquiry-field input:focus{border-color:#174a7e;background:#fff;box-shadow:0 0 0 4px rgba(23,74,126,.08);}
  .enquiry-send{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:11px;border:none;background:#174a7e;color:white;display:flex;align-items:center;justify-content:center;}
  `;
  document.head.appendChild(style);

  const modalHTML = `
  <div class="modal fade enquiry-modal" id="studentEnquiryModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="max-width:380px;">
      <div class="modal-content">
        <div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="enquiry-field">
            <i class="bi bi-chat-left-text"></i>
            <input id="studentEnquiryInput" type="text" placeholder="अपना संदेश लिखें..." />
            <button class="enquiry-send" onclick="sendStudentEnquiry()"><i class="bi bi-send-fill"></i></button>
          </div>
          <div style="font-size:11px;color:#64748b;text-align:center;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:5px;"><i class="bi bi-whatsapp" style="color:#25D366;"></i> सीधा सर के WhatsApp पर</div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  window.openEnquiryModal = function(e){
    if(e) e.preventDefault();
    new bootstrap.Modal(document.getElementById('studentEnquiryModal')).show();
    setTimeout(()=>document.getElementById('studentEnquiryInput').focus(),300);
  }

  window.sendStudentEnquiry = function(){
    let msg = document.getElementById('studentEnquiryInput').value.trim();
    if(!msg){ document.getElementById('studentEnquiryInput').focus(); return; }

    // ===== NAME CLEAN - Welcome हटा दिया =====
    let rawName = document.getElementById('studentName')?.innerText || window.currentStudent?.name || localStorage.getItem('studentName') || "छात्र";
    let name = rawName.replace(/Welcome/gi, "").replace(/स्वागत/gi, "").trim();
    
    let sClass = document.getElementById('studentInfo')?.innerText.trim() || window.currentStudent?.class || localStorage.getItem('studentClass') || "N/A";
    if(sClass.length > 80) sClass = sClass.substring(0,80);

    // ===== PHONE AUTO READ - 10 जगह से खोज =====
    let phone = "";
    try{
      let lsData = JSON.parse(localStorage.getItem('studentData') || '{}');
      phone = window.currentStudent?.phone || window.currentStudent?.mobile || window.studentData?.phone || lsData.phone || lsData.mobile || localStorage.getItem('studentPhone') || localStorage.getItem('phone') || localStorage.getItem('mobile') || document.getElementById('studentPhone')?.innerText || "";
    }catch(e){ phone = localStorage.getItem('studentPhone') || ""; }

    phone = phone.toString().replace(/\D/g,'').slice(-10);

    // ===== FINAL CLEAN MESSAGE - जैसा आपने बोला =====
    let finalMsg = `👤 नाम: ${name}\n🎓 ${sClass}\n\n💬 संदेश: ${msg}`;
    
    // अगर नंबर मिला तो ही Reply लिंक जोड़ो, वरना नहीं
    if(phone && phone.length == 10){
      finalMsg += `\n\n_Reply: https://wa.me/91${phone}_`;
    }

    window.open(`https://wa.me/919425123350?text=${encodeURIComponent(finalMsg)}`,'_blank');
  }
})();